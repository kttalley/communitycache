"""catthings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from rest_framework import routers

from api.views import DepotViewSet, ItemViewSet, PledgeViewSet, NeedViewSet, UserProfileViewSet
from catthings import settings

router = routers.SimpleRouter()

router.register(r'depots', DepotViewSet)
router.register(r'items', ItemViewSet)
router.register(r'pledges', PledgeViewSet)
router.register(r'needs', NeedViewSet)
router.register(r'user-profiles', UserProfileViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='base.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += router.urls
