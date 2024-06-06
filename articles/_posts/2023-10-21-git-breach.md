---
layout: post
title: La importancia de .gitignore
date: 2023-10-21
categories: [git,ciberseguridad,"data exposure"]
thumbnail: "assets/images/git.jpg"
---

#### Contenido
- [¿Qué es Git?](#qué-es-git)
- [¿Qué es .gitignore?](#qué-es-gitignore)
- [¿Es obligatorio usar .gitignore?](#es-obligatorio-usar-gitignore)
- [Git y la ciberseguridad](#git-y-la-ciberseguridad)
- [Demostración práctica:](#demostración-práctica)
- [Conclusión](#conclusión)
- [Fuentes](#fuentes)


Como desarrolladores de aplicaciones, es casi un fundamento conocer `git`, debido a sus facilidades al momento de trabajar con proyectos colaborativos así como mantener un respaldo de nuestro trabajo. Pero es necesario adoptar buenas prácticas de seguridad si no queremos atraer personas no deseadas.

## ¿Qué es Git?
Git es un sistema de control de versiones distribuido ampliamente utilizado para rastrear cambios en archivos y proyectos de software. Permite a los desarrolladores colaborar, mantener un historial de versiones y trabajar de manera eficiente en proyectos de programación.

## ¿Qué es .gitignore?
Es un archivo especial mediante el cual se ignoran (bastante conveniente con el nombre) los archivos del proyecto local, especialmente los archivos que no queremos compartir aún debido a que pueden contener información sensible como contraseñas o usuarios (Sí, revelar usuarios es peligroso también).

## ¿Es obligatorio usar .gitignore?
No, no existe alguna manera en la que git deje de funcionar si no tenemos un archivo `.gitignore` en nuestro repositorio, sin embargo es una buena práctica ya que al usarlo, nos ahorramos tiempo en tener que mover o eliminar archivos que no queramos subir

## Git y la ciberseguridad
Cuando creamos proyectos, de cualquier tipo, si usamos git, debemos tener muy presente que si en algún momento subimos algo que no queremos, aunque eliminemos el commit, este aún podrá ser visto, puesto que en realidad no se está eliminando, sino que simplemente se elimina la referencia a dicho commit.

Debido a que existen muchas formas de recuperar dicha información, cuando estamos buscando vulnerabilidades en una aplicación y descubrimos que se desarrolla en un git, y mejor aún, en algún git público, en una buena parte de los casos, la enumeración y reconocimiento activo resulta en información valiosa que nos permita manipular la aplicación y obtener el deseado acceso privilegiado.

## Demostración práctica:

Para comprobar que lo que se dice es cierto y respaldar este artículo, mostraré una demostración práctica de cómo obtener información sensible de un repositorio git (aunque este sea privado).

> Voy a saltarme varias etapas de enumeración y reconocimiento activo, ya que no es el objetivo de este artículo, pero si quieres aprender más, proximamente estaré publicando un artículo sobre esto.


<img src="/assets/images/git-breach/login.jpg" alt="Login genérico">
En esta imagen podemos apreciar un login genérico que representa una aplicación web (podemos suponer que es el login del administrador).

<img src="/assets/images/git-breach/git.jpg" alt="Directorio interesante...">
En esta imagen podemos apreciar un directorio llamado `.git` que nos indica que el proyecto está siendo versionado con git. aparentemente los archivos no son relevantes, pero si nos ponemos creativos, y de alguna manera logramos conseguir el directorio `.git` de un repositorio, podemos obtener información valiosa sobre el funcionamiento de nuestro objetivo.

<img src="/assets/images/git-breach/dump.jpg" alt=".git en nuestras manos">
De alguna manera logramos descargar todo el contenido de nuestra aplicación vulnerable, y ahora tenemos el directorio `.git` en nuestras manos. ¿Ahora qué?

<img src="/assets/images/git-breach/git-enum.jpg" alt=".git en nuestras manos">
Con una enumeración simple podemos obtener el registro de los archivos valiosos que están o pudieron estar en nuestro repositorio objetivo, generalmente se encuentra en los primeros commits, cuando la aplicación está tan fresca que no se ha considerado el tema de la seguridad. Podemos ver archivos que se encontraron en el git y ya no están, así como la lista de commits que se han hecho.

<img src="/assets/images/git-breach/interesting.jpg" alt=".git en nuestras manos">
En los comentarios de los commit se encuentran descripciones útiles para un atacante, en este caso sabemos que hace unos commits la aplicación tenía estándares de seguridad insuficientes. Vamos a aprovechar eso y (Sin tener acceso al git original ya que es privado) obtendremos los archivos que se encontraban en ese commit.

<img src="/assets/images/git-breach/recover.jpg" alt=".git en nuestras manos">
> ¿Qué es esto? ¿Cómo obtuvimos los archivos de un git privado?
La respuesta es simple, abusando del mecanismo de git, que nos permite recuperar archivos que se encontraban en un commit anterior, y como ya sabemos, el commit que nos interesa es el que tiene la información sensible.

Ahora sólo nos queda husmear entre los archivos, para fines prácticos el código vulnerable es el siguiente:

<img src="/assets/images/git-breach/juice.jpg" alt=".git en nuestras manos">
Podemos apreciar credenciales de accesso del usuario `admin`, las cuales permitirían a un atacante, obtener acceso privilegiado a la aplicación. Y en pocas palabras, hacer lo que quiera con ella.

## Conclusión
Este tipo de vulnerabilidades son más comunes de lo que se piensa, y es por eso que deben aprovecharse los mecanismos para exponer información sensible, ya que en muchas ocasiones, la información que se encuentra en un git, es más valiosa que la propia aplicación.
En nuestro caso de prueba, pudieron hacerse muchas cosas para **evitar este problema**, por ejemplo:
- no subir ni por accidente el archivo de prueba que contiene credenciales.
- escribir código seguro desde el inicio.
- usar `.gitignore` para evitar subir archivos que no queremos.
- no exponer el `.git` de la aplicación.



## Fuentes

- <a href="https://www.atlassian.com/es/git/tutorials/saving-changes/gitignore" target="_blank">https://www.atlassian.com/es/git/tutorials/saving-changes/gitignore</a>
- La prueba práctica se ha obtenido de <a href="https://tryhackme.com/signup?referrer=5ef55c3344692953ccc58b16" target="_blank">Tryhackme - Git Happens</a>
