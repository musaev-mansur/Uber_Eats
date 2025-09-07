from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Food, FoodCategory, Order, OrderFood


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователя"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm', 'role', 'phone', 'city', 'address', 'image')
        extra_kwargs = {
            'email': {'required': True},
            'phone': {'required': True},
            'city': {'required': True},
            'address': {'required': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    """Сериализатор для входа пользователя"""
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    attrs['user'] = user
                    return attrs
                else:
                    raise serializers.ValidationError('Неверный пароль')
            except User.DoesNotExist:
                raise serializers.ValidationError('Пользователь не найден')
        else:
            raise serializers.ValidationError('Необходимо указать email и пароль')


class UserProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для профиля пользователя"""
    menu = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone', 'city', 'address', 'image', 'menu')
        read_only_fields = ('id', 'role')
    
    def get_menu(self, obj):
        if obj.role == 'cafe':
            return FoodSerializer(obj.menu.all(), many=True).data
        return None


class UserEditSerializer(serializers.ModelSerializer):
    """Сериализатор для редактирования пользователя"""
    
    class Meta:
        model = User
        fields = ('username', 'email', 'phone', 'city', 'address', 'image')


class FoodCategorySerializer(serializers.ModelSerializer):
    """Сериализатор для категорий еды"""
    
    class Meta:
        model = FoodCategory
        fields = ('id', 'name')


class FoodSerializer(serializers.ModelSerializer):
    """Сериализатор для блюд"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    cafe_name = serializers.CharField(source='cafe.username', read_only=True)
    
    class Meta:
        model = Food
        fields = ('id', 'name', 'image', 'info', 'category', 'category_name', 'price', 'cafe', 'cafe_name', 'created_at')
        read_only_fields = ('id', 'created_at')


class OrderFoodSerializer(serializers.ModelSerializer):
    """Сериализатор для блюд в заказе"""
    food = FoodSerializer(read_only=True)
    food_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = OrderFood
        fields = ('food', 'food_id', 'quantity')


class OrderSerializer(serializers.ModelSerializer):
    """Сериализатор для заказов"""
    foods = OrderFoodSerializer(source='orderfood_set', many=True, read_only=True)
    cafe_name = serializers.CharField(source='cafe.username', read_only=True)
    client_name = serializers.CharField(source='client.username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'foods', 'cafe', 'cafe_name', 'client', 'client_name', 'total', 'status', 'status_display', 'from_time', 'to_time', 'created_at')
        read_only_fields = ('id', 'created_at', 'status')
    
    def create(self, validated_data):
        foods_data = self.context.get('foods_data', [])
        order = Order.objects.create(**validated_data)
        
        for food_data in foods_data:
            OrderFood.objects.create(
                order=order,
                food_id=food_data['food_id'],
                quantity=food_data.get('quantity', 1)
            )
        
        return order


class CreateOrderSerializer(serializers.Serializer):
    """Сериализатор для создания заказа"""
    foods = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
    cafe_id = serializers.UUIDField()
    client_id = serializers.UUIDField()
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    from_time = serializers.DateTimeField()
    to_time = serializers.DateTimeField()
    
    def validate_foods(self, value):
        for food in value:
            if 'food_id' not in food:
                raise serializers.ValidationError("Каждое блюдо должно содержать food_id")
            if 'quantity' not in food:
                food['quantity'] = 1
        return value
    
    def create(self, validated_data):
        foods_data = validated_data.pop('foods')
        order = Order.objects.create(**validated_data)
        
        for food_data in foods_data:
            OrderFood.objects.create(
                order=order,
                food_id=food_data['food_id'],
                quantity=food_data['quantity']
            )
        
        return order
