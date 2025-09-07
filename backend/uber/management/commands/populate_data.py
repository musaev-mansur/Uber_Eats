from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from uber.models import FoodCategory, Food
from decimal import Decimal
import uuid

User = get_user_model()

class Command(BaseCommand):
    help = 'Заполняет базу данных тестовыми данными'

    def handle(self, *args, **options):
        self.stdout.write('Начинаем заполнение базы данных...')
        
        # Создаем категории
        categories_data = [
            {'name': 'Пицца'},
            {'name': 'Суши'},
            {'name': 'Бургеры'},
            {'name': 'Салаты'},
            {'name': 'Паста'},
            {'name': 'Десерты'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = FoodCategory.objects.get_or_create(
                name=cat_data['name']
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Создана категория: {category.name}')
        
        # Создаем кафе
        cafes_data = [
            {
                'username': 'Итальянская кухня',
                'email': 'italian@example.com',
                'role': 'cafe',
                'phone': '+7 (999) 123-45-67',
                'city': 'Москва',
                'address': 'ул. Тверская, 1',
            },
            {
                'username': 'Суши Мастер',
                'email': 'sushi@example.com',
                'role': 'cafe',
                'phone': '+7 (999) 234-56-78',
                'city': 'Москва',
                'address': 'ул. Арбат, 15',
            },
            {
                'username': 'Бургер Хаус',
                'email': 'burger@example.com',
                'role': 'cafe',
                'phone': '+7 (999) 345-67-89',
                'city': 'Москва',
                'address': 'пр. Мира, 25',
            },
            {
                'username': 'Домашняя кухня',
                'email': 'home@example.com',
                'role': 'cafe',
                'phone': '+7 (999) 456-78-90',
                'city': 'Москва',
                'address': 'ул. Ленина, 10',
            },
        ]
        
        cafes = {}
        for cafe_data in cafes_data:
            cafe, created = User.objects.get_or_create(
                username=cafe_data['username'],
                defaults={
                    'email': cafe_data['email'],
                    'role': cafe_data['role'],
                    'phone': cafe_data['phone'],
                    'city': cafe_data['city'],
                    'address': cafe_data['address'],
                }
            )
            cafes[cafe_data['username']] = cafe
            if created:
                self.stdout.write(f'Создано кафе: {cafe.username}')
        
        # Создаем блюда
        foods_data = [
            # Итальянская кухня
            {
                'name': 'Маргарита',
                'info': 'Классическая пицца с томатами, моцареллой и базиликом',
                'category': 'Пицца',
                'price': Decimal('890.00'),
                'cafe': 'Итальянская кухня',
            },
            {
                'name': 'Пепперони',
                'info': 'Пицца с колбасой пепперони и сыром моцарелла',
                'category': 'Пицца',
                'price': Decimal('950.00'),
                'cafe': 'Итальянская кухня',
            },
            {
                'name': 'Карбонара',
                'info': 'Паста с беконом, яйцом и сыром пармезан',
                'category': 'Паста',
                'price': Decimal('750.00'),
                'cafe': 'Итальянская кухня',
            },
            {
                'name': 'Тирамису',
                'info': 'Классический итальянский десерт с кофе и маскарпоне',
                'category': 'Десерты',
                'price': Decimal('450.00'),
                'cafe': 'Итальянская кухня',
            },
            
            # Суши Мастер
            {
                'name': 'Филадельфия',
                'info': 'Ролл с лососем, огурцом и сливочным сыром',
                'category': 'Суши',
                'price': Decimal('650.00'),
                'cafe': 'Суши Мастер',
            },
            {
                'name': 'Калифорния',
                'info': 'Ролл с крабовым мясом, авокадо и огурцом',
                'category': 'Суши',
                'price': Decimal('580.00'),
                'cafe': 'Суши Мастер',
            },
            {
                'name': 'Лосось Сашими',
                'info': 'Свежий лосось, нарезанный тонкими ломтиками',
                'category': 'Суши',
                'price': Decimal('1200.00'),
                'cafe': 'Суши Мастер',
            },
            
            # Бургер Хаус
            {
                'name': 'Чизбургер Делюкс',
                'info': 'Сочная котлета, сыр чеддер, салат, томаты, соус',
                'category': 'Бургеры',
                'price': Decimal('520.00'),
                'cafe': 'Бургер Хаус',
            },
            {
                'name': 'Биг Бургер',
                'info': 'Двойная котлета, бекон, сыр, лук, соус барбекю',
                'category': 'Бургеры',
                'price': Decimal('680.00'),
                'cafe': 'Бургер Хаус',
            },
            {
                'name': 'Вегги Бургер',
                'info': 'Вегетарианский бургер с овощами и соусом',
                'category': 'Бургеры',
                'price': Decimal('450.00'),
                'cafe': 'Бургер Хаус',
            },
            
            # Домашняя кухня
            {
                'name': 'Цезарь с курицей',
                'info': 'Свежий салат с курицей, пармезаном и соусом цезарь',
                'category': 'Салаты',
                'price': Decimal('420.00'),
                'cafe': 'Домашняя кухня',
            },
            {
                'name': 'Греческий салат',
                'info': 'Салат с помидорами, огурцами, оливками и фетой',
                'category': 'Салаты',
                'price': Decimal('380.00'),
                'cafe': 'Домашняя кухня',
            },
            {
                'name': 'Борщ украинский',
                'info': 'Классический борщ с говядиной и сметаной',
                'category': 'Салаты',
                'price': Decimal('350.00'),
                'cafe': 'Домашняя кухня',
            },
        ]
        
        for food_data in foods_data:
            food, created = Food.objects.get_or_create(
                name=food_data['name'],
                cafe=cafes[food_data['cafe']],
                defaults={
                    'info': food_data['info'],
                    'category': categories[food_data['category']],
                    'price': food_data['price'],
                }
            )
            if created:
                self.stdout.write(f'Создано блюдо: {food.name} в {food.cafe.username}')
        
        # Создаем тестового клиента
        client, created = User.objects.get_or_create(
            username='test_client',
            defaults={
                'email': 'client@example.com',
                'role': 'client',
                'phone': '+7 (999) 000-00-00',
                'city': 'Москва',
                'address': 'ул. Тестовая, 1',
            }
        )
        if created:
            self.stdout.write(f'Создан тестовый клиент: {client.username}')
        
        self.stdout.write(
            self.style.SUCCESS('База данных успешно заполнена тестовыми данными!')
        )
