from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import User, Food, FoodCategory, Order
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,
    UserEditSerializer, FoodSerializer, FoodCategorySerializer,
    OrderSerializer, CreateOrderSerializer
)


class UserRegistrationView(APIView):
    """API для регистрации пользователя"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': str(user.id),
                'role': user.role,
                'user': UserProfileSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """API для входа пользователя"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': str(user.id),
                'role': user.role,
                'user': UserProfileSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """API для получения и обновления профиля пользователя"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserEditSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserProfileSerializer(request.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FoodCategoryListView(generics.ListAPIView):
    """API для получения списка категорий еды"""
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = [permissions.AllowAny]


class FoodListView(generics.ListAPIView):
    """API для получения списка блюд с фильтрацией"""
    serializer_class = FoodSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Food.objects.select_related('category', 'cafe').all()
        
        # Фильтрация по категории
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Фильтрация по кафе
        cafe_id = self.request.query_params.get('cafe_id')
        if cafe_id:
            queryset = queryset.filter(cafe_id=cafe_id)
        
        # Поиск по названию
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset


class FoodDetailView(generics.RetrieveAPIView):
    """API для получения детальной информации о блюде"""
    queryset = Food.objects.select_related('category', 'cafe')
    serializer_class = FoodSerializer
    permission_classes = [permissions.AllowAny]


class FoodCreateView(generics.CreateAPIView):
    """API для создания блюда (только для кафе)"""
    serializer_class = FoodSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        if self.request.user.role != 'cafe':
            raise permissions.PermissionDenied("Только кафе могут создавать блюда")
        serializer.save(cafe=self.request.user)


class FoodUpdateView(generics.UpdateAPIView):
    """API для обновления блюда (только владелец кафе)"""
    serializer_class = FoodSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Food.objects.filter(cafe=self.request.user)


class FoodDeleteView(generics.DestroyAPIView):
    """API для удаления блюда (только владелец кафе)"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Food.objects.filter(cafe=self.request.user)


class OrderListView(generics.ListAPIView):
    """API для получения списка заказов"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            return Order.objects.filter(client=user).select_related('cafe', 'client').prefetch_related('orderfood_set__food')
        elif user.role == 'cafe':
            return Order.objects.filter(cafe=user).select_related('cafe', 'client').prefetch_related('orderfood_set__food')
        return Order.objects.none()


class OrderCreateView(APIView):
    """API для создания заказа"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        if request.user.role != 'client':
            return Response(
                {'error': 'Только клиенты могут создавать заказы'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid():
            # Устанавливаем клиента из токена
            order_data = serializer.validated_data.copy()
            order_data['client'] = request.user
            
            order = serializer.create(order_data)
            return Response(
                OrderSerializer(order).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(generics.RetrieveUpdateAPIView):
    """API для получения и обновления заказа"""
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            return Order.objects.filter(client=user)
        elif user.role == 'cafe':
            return Order.objects.filter(cafe=user)
        return Order.objects.none()
    
    def update(self, request, *args, **kwargs):
        order = self.get_object()
        
        # Только кафе может изменять статус заказа
        if request.user.role == 'cafe' and 'status' in request.data:
            order.status = request.data['status']
            order.save()
            return Response(OrderSerializer(order).data)
        
        return Response(
            {'error': 'Недостаточно прав для изменения заказа'}, 
            status=status.HTTP_403_FORBIDDEN
        )


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_logout(request):
    """API для выхода пользователя"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Успешный выход'}, status=status.HTTP_200_OK)
    except:
        return Response({'error': 'Ошибка при выходе'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def cafe_list(request):
    """API для получения списка кафе"""
    cafes = User.objects.filter(role='cafe').values('id', 'username', 'city', 'address', 'image')
    return Response(cafes)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def cafe_menu(request, cafe_id):
    """API для получения меню конкретного кафе"""
    try:
        cafe = get_object_or_404(User, id=cafe_id, role='cafe')
        foods = Food.objects.filter(cafe=cafe).select_related('category')
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'Кафе не найдено'}, status=status.HTTP_404_NOT_FOUND)
