# Backend Documentation

## Django setup

Setup of API followiong :

https://www.django-rest-framework.org/tutorial/quickstart/

and Todos Model following : 

https://docs.djangoproject.com/en/3.1/intro/tutorial02/

### Quick outline of both tutorials

1. Create "app" `todos` with

    ```django-admin startapp todos```
    
    define models in `todos/models.py` and register app in `api/settings.py` as well as `'rest_framework'`.
    
2. Generate migration table with `python manage.py makemigrations todos` and migrate DB with `python manage.py migrate`

3. Create `todos/serializers.py` and update `todos/views.py` and `api/urls.py`.

### Create Superuser

``` python manage.py createsuperuser --email admin@example.com --username admin ```
