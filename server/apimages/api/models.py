from django.db import models

# Create your models here.

### CLASSE IMAGE
class Image(models.Model):
    # clé primaire, avec auto incrémentation
    idImage = models.AutoField(primary_key=True)
    # chaine de caractre de taille bornee
    nom = models.CharField(max_length=50)
    # Date de l'image
    date = models.DateField()
    # Description de l'image
    description = models.TextField(blank=True)  # champ texte optionnel
    # Image associée
    src = models.ImageField(default="default.png", upload_to='./')
    
    # Méthode toString() pour affichage
    def __str__(self):
        return f"{self.nom} (date: {self.date})"

### CLASSE COMMENTAIRE
class Commentaire(models.Model):
    # Clé étrangère liée à Image (un commentaire appartient à une image)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    # Contenu du commentaire
    contenu = models.TextField()
    # Date du commentaire
    date = models.DateTimeField(auto_now_add=True)

    # Méthode toString() pour affichage
    def __str__(self):
        return f"Commentaire sur {self.image.nom}: {self.contenu[:30]}..."
