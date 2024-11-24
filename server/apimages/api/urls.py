from django.core.files import images
from django.urls import URLPattern, path
from .views import get_images
from .views import create_image
from .views import edit_image
from .views import delete_image

urlpatterns = [
    path('images/', get_images, name='get_images'),
    path('images/create/', create_image, name='create_image'),
    path('images/edit/<int:id>/', edit_image, name='edit_image'),
    path('images/delete/<int:id>/', delete_image, name='delete_image')
]
