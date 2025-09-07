from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Food, FoodCategory, Order, OrderFood


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'city', 'is_active')
    list_filter = ('role', 'is_active', 'is_staff', 'date_joined')
    search_fields = ('username', 'email', 'phone', 'city')
    ordering = ('username',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительная информация', {
            'fields': ('role', 'phone', 'city', 'address', 'image')
        }),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Дополнительная информация', {
            'fields': ('role', 'phone', 'city', 'address', 'image')
        }),
    )


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'cafe', 'category', 'price', 'created_at')
    list_filter = ('category', 'cafe', 'created_at')
    search_fields = ('name', 'info', 'cafe__username')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class OrderFoodInline(admin.TabularInline):
    model = OrderFood
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'cafe', 'total', 'status', 'created_at')
    list_filter = ('status', 'cafe', 'created_at')
    search_fields = ('client__username', 'cafe__username')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    inlines = [OrderFoodInline]


@admin.register(OrderFood)
class OrderFoodAdmin(admin.ModelAdmin):
    list_display = ('order', 'food', 'quantity')
    list_filter = ('order__status', 'food__category')
