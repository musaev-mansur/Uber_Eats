from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

# Создаем роутер для ViewSets (если понадобится в будущем)
router = DefaultRouter()

urlpatterns = [
    # Админ панель
    path('admin/', admin.site.urls),
    
    # Аутентификация
    path('api/auth/register/', views.UserRegistrationView.as_view(), name='user-register'),
    path('api/auth/login/', views.UserLoginView.as_view(), name='user-login'),
    path('api/auth/logout/', views.user_logout, name='user-logout'),
    
    # Профиль пользователя
    path('api/auth/profile/', views.UserProfileView.as_view(), name='user-profile'),
    
    # Категории еды
    path('api/categories/', views.FoodCategoryListView.as_view(), name='food-categories'),
    
    # Блюда
    path('api/foods/', views.FoodListView.as_view(), name='food-list'),
    path('api/foods/<uuid:pk>/', views.FoodDetailView.as_view(), name='food-detail'),
    path('api/foods/create/', views.FoodCreateView.as_view(), name='food-create'),
    path('api/foods/<uuid:pk>/update/', views.FoodUpdateView.as_view(), name='food-update'),
    path('api/foods/<uuid:pk>/delete/', views.FoodDeleteView.as_view(), name='food-delete'),
    
    # Заказы
    path('api/orders/', views.OrderListView.as_view(), name='order-list'),
    path('api/orders/create/', views.OrderCreateView.as_view(), name='order-create'),
    path('api/orders/<uuid:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    
    # Кафе
    path('api/cafes/', views.cafe_list, name='cafe-list'),
    path('api/cafes/<uuid:cafe_id>/menu/', views.cafe_menu, name='cafe-menu'),
    
    # API роутер (для будущих ViewSets)
    path('api/', include(router.urls)),
]

# Обслуживание медиа файлов в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)