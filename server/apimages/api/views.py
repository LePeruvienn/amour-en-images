from django.db.models.signals import partial
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.schemas.coreapi import serializers
from .models import Image
from .serializer import ImageSerializer

### GET IMAGES
@api_view(['GET'])
def get_images(request):
    # On récupère toues les images
    images = Image.objects.all()
    # On sérailizer les données JSON en Image
    serializedData = ImageSerializer(images, many=True).data
    # On renvoie les données au client
    return Response(serializedData)

### CREATE IMAGE
@api_view(['POST'])
def create_image(request):
    # Use MultiPartParser to handle file uploads
    parser_classes = [MultiPartParser, FormParser]  # This tells DRF to parse multipart/form-data
    # On récupère les données POST de la requête
    data = request.data
    # On converti les données JSON en Image
    serializer = ImageSerializer(data=data)
    # Si les données on bien été converti, on save et renvoie un message ok
    if serializer.is_valid ():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Sinon on renvoie les erreursj
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### DELETE IMAGE
@api_view(['POST','DELETE'])
def delete_image(request,id):
    # On essaye de récupèrer l'image ...
    try:
        image = Image.objects.get(pk=id)
    # Si l'image existe pas on renvoie une erreur
    except Image.DoesNotExist:
        return Response( {"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)
    # Si elle existe on la supprime et on renvoie un message de succès !
    image.delete()
    return Response({"message": "Image delete succesfully"}, status=status.HTTP_200_OK)


### EDIT IMAGE
@api_view(['POST','PUT','PATCH'])
def edit_image(request,id):
    # On essaye de récupèrer l'image ...
    try:
        image = Image.objects.get(pk=id)
    # Si l'image existe pas on renvoie une erreur
    except Image.DoesNotExist:
        return Response( {"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

    # Use MultiPartParser to handle file uploads
    parser_classes = [MultiPartParser, FormParser]  # This tells DRF to parse multipart/form-data
    # On récupère les données de la requête
    data = request.data
    # On converti les données JSON en Image
    serializer = ImageSerializer(image,data=data,partial=(request.method == 'PATCH'))
    # Si les données on bien été converti, on save et renvoie un message ok
    if serializer.is_valid ():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Sinon on renvoie les erreursj
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
