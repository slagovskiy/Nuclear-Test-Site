# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-03 01:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='db',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='db_fld',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=50)),
                ('type', models.IntegerField(choices=[(1, 'NUMERIC'), (2, 'STRING'), (3, 'DATE'), (4, 'IP'), (5, 'PASSWORD')])),
                ('deleted', models.BooleanField(default=False)),
                ('db', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dtable.db')),
            ],
        ),
        migrations.CreateModel(
            name='db_indx',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num', models.IntegerField(default=0)),
                ('deleted', models.BooleanField(default=False)),
                ('db', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dtable.db')),
            ],
        ),
        migrations.CreateModel(
            name='db_val',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('val', models.CharField(default='', max_length=255)),
                ('fld', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dtable.db_fld')),
                ('nid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dtable.db_indx')),
            ],
        ),
    ]
