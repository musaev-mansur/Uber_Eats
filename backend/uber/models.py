from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
import uuid


class User(AbstractUser):
    """Модель пользователя (клиент или кафе)"""
    ROLE_CHOICES = [
        ('client', 'Клиент'),
        ('cafe', 'Кафе'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    phone = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    image = models.ImageField(upload_to='user_images/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"


class FoodCategory(models.Model):
    """Модель категории еды"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    
    class Meta:
        verbose_name = "Категория еды"
        verbose_name_plural = "Категории еды"
    
    def __str__(self):
        return self.name


class Food(models.Model):
    """Модель блюда"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='food_images/')
    info = models.TextField(help_text="Описание блюда")
    category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE, related_name='foods')
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    cafe = models.ForeignKey(User, on_delete=models.CASCADE, related_name='menu', limit_choices_to={'role': 'cafe'})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Блюдо"
        verbose_name_plural = "Блюда"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.cafe.username}"


class Order(models.Model):
    """Модель заказа"""
    STATUS_CHOICES = [
        ('pending', 'Ожидает'),
        ('confirmed', 'Подтвержден'),
        ('preparing', 'Готовится'),
        ('ready', 'Готов'),
        ('delivered', 'Доставлен'),
        ('cancelled', 'Отменен'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    foods = models.ManyToManyField(Food, through='OrderFood')
    cafe = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cafe_orders', limit_choices_to={'role': 'cafe'})
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_orders', limit_choices_to={'role': 'client'})
    total = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    from_time = models.DateTimeField(help_text="Время начала приготовления")
    to_time = models.DateTimeField(help_text="Время готовности")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Заказ #{self.id} - {self.client.username}"


class OrderFood(models.Model):
    """Промежуточная модель для связи заказа и блюд с количеством"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ['order', 'food']
    
    def __str__(self):
        return f"{self.order.id} - {self.food.name} x{self.quantity}"
