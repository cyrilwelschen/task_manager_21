from datetime import timedelta

from django.db import models
from django.utils import timezone


class Todo(models.Model):
    description = models.CharField(max_length=100)
    category = models.CharField(max_length=20)
    deadline = models.DateField('deadline')
    creation_date = models.DateTimeField('creation-date', auto_now_add=True)
    is_short_task = models.BooleanField('is-short')
    is_jira = models.BooleanField('is-jira')
    soft_prio = models.IntegerField(default=0)
    hard_prio = models.IntegerField(default=0)


    def is_deadline_today(self):
        return self.deadline >= timezone.now() - timedelta(days=1)