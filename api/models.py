from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class CharacterModel(models.Model):
    objects = models.Manager()

    user_rec = models.ForeignKey(User, on_delete=models.PROTECT)
    char_name = models.CharField(max_length=99)
    CLASSES = [
       ('JUIC', 'Juicer'),
       ('SYMB', 'Symbient'),
       ('MACH', 'Machinist'),
       ('CIPH', 'Cipher'),
    ]
    char_class = models.CharField(
        max_length=4,
        choices=CLASSES
    )
    RACES = [
        ('O_DU', 'Old Worlder, Stardust'),
        ('O_BL', 'Old Worlder, Black'),
        ('O_WH', 'Old Worlder, White'),
        ('O_NE', 'Old Worlder, Nebula'),
        ('P_DR', 'Peasant, Dreamer'),
        ('P_AR', 'Peasant, Arsons'),
        ('T_TU', 'Tecchi, Turing'),
        ('T_NI', 'Tecchi, Nikola'),
        ('T_EN', 'Tecchi, Ender'),
        ('N_MA', 'Noble, Mars'),
        ('N_AL', 'Noble, Alsaud'),
        ('N_BO', 'Noble, Boehringer'),
        ('N_DU', 'Noble, Dumas'),
        ('P_EC', 'Patrician, Ecstasy'),
        ('P_DR', 'Patrician, Drunkard'),
        ('P_EX', 'Patrician, Expanded'),
    ]
    char_race = models.CharField(
        max_length=4,
        choices=RACES
    )
    str = models.IntegerField()
    dex = models.IntegerField()
    con = models.IntegerField()
    wis = models.IntegerField()
    int = models.IntegerField()
    end = models.IntegerField()

    def __str__(self):
        return self.char_name


