from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
 
    
#size = fields.IntegerRangeField(min_value=-100, max_value=100)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']
