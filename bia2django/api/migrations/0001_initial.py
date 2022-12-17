# Generated by Django 4.1.4 on 2022-12-17 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MH',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('MH_email', models.EmailField(max_length=100)),
                ('MH_password', models.CharField(max_length=100)),
                ('teacher_number', models.CharField(max_length=50)),
                ('degree', models.CharField(max_length=100)),
                ('field', models.CharField(max_length=100)),
                ('link_to_webpage', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Time',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('user_email', models.EmailField(max_length=100)),
                ('user_password', models.CharField(max_length=100)),
                ('student_number', models.CharField(max_length=50)),
                ('mobile_number', models.CharField(max_length=50)),
                ('degree', models.CharField(max_length=100)),
                ('field', models.CharField(max_length=100)),
                ('university', models.CharField(max_length=100)),
                ('adviserID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mh')),
            ],
        ),
        migrations.CreateModel(
            name='MH_Time',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MHID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mh')),
                ('timeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.time')),
            ],
        ),
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(default=None, max_length=100)),
                ('rate', models.IntegerField(default=None)),
                ('description', models.TextField(default=None)),
                ('was_holded', models.BooleanField(default=None)),
                ('MHID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mh')),
                ('timeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.time')),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
