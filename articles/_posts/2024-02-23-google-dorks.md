---
layout: post
title: "Google Dorks: Qué son y para qué" 
date: 2024-02-23
categories: [ciberseguridad,"google hacking","busquedas avanzadas"]
thumbnail: "assets/images/dorking.png"
---

Como usuarios de la tecnología y, aún más importante, como defensores de la seguridad de la información, es fundamental estar familiarizados con las herramientas disponibles para acceder a información oficial y proveniente de fuentes confiables. Además, se recomienda encarecidamente tener conocimientos sobre búsquedas avanzadas para evitar la necesidad de revisar cada título de página en busca de la información deseada después de realizar una búsqueda en un motor de búsqueda.

## ¿Qué es un motor de búsqueda?

Se conoce como motor de búsqueda a cualquier software capaz de buscar (así es, el buscador busca) y recopila información y la devuelven según las palabras clave que se le introducen, el ejemplo por excelencia (hmm...) es **Google**, otro muy conocido por los amantes de la privacidad, podría ser **Duck Duck Go**, así mismo **Bing**, **Yahoo!**, entre tantos otros. Básicamente son los buscadores que nos dan las páginas según nuestras solicitudes.

## Desventajas de un motor de búsqueda

Podrá parecer que estos mounstros de la información son perfectos porque si buscamos "Facebook" el servicio nos va a mostrar la página de Facebook, pero esto son búsquedas sencillas, ¿Qué pasa si estamos buscando algo específico?

#### Sobrecarga de información
Aterrizando la idea, Muchas veces queremos encontrar alguna página puntual para realizar algún trámite, o para realizar alguna compra, o para escoger algun servicio, incluso para instalar algún software, ¿Qué pasa cuando nuestro buscador nos inunda con anuncios, con páginas no oficiales e incluso páginas *Scam*.

#### Información desactualizada
Muchas veces hay algun evento actual sobre el que queremos consultar, como por ejemplo noticias en algún fenónemo natural (un sismo, un huracán, una tormenta) o algún evento importante de nuestro interés (evento de relevancia , concierto, conferencia, persona de interés), muchas veces el algoritmo falla y nos muestra información obsoleta para el momento, con lo cual tenemos que ser muy cautelosos al revisar las fechas para no caer en desinformación.

#### Falta de contexto
Supongamos que queremos instalar la distribución linux Parrot (viva!) y googleamos: *parrot* naturalmente el motor de búsqueda no sabe que nos referimos a un software, mucho menos que nos referimos a una distribución de linux, por lo tanto nos va a regresar imagenes de parrots (loros) y cosas relacionadas a su cuidado, y muy al final, tal vez veamos la página oficial de parrot, que es la que buscamos.

Ahora somos conscientes que el motor es eso, una herramienta incapaz de entender nuestros pensamientos y su contexto, por eso mismo necesitamos de métodos avanzados de búsqueda, los dorks.



## ¿Qué es un Dork?

Un Dork, es un método avanzado de búsqueda basado en sintaxis, que facilita al navegador y filtra lo que nos sirve, de lo que no, en el contexto de la seguridad, principalmente nos ayuda a aprovechar de una mejor manera la capacidad de los algoritmos de búsqueda de estos motores, e incluso para encontrar información muy específica, que de otras maneras no habríamos sido capaces de encontrar.


## ¿Para qué sirven los Dorks?

Los dorks nos ayudan a encontrar URL's valiosas tanto para reconocimiento profundo, como para descubrir fallas de seguridad, tal cual, (recap de cuando encontré una DB de empleados del IMSSS usando google dorks), así mismo nos podrían ayudar a encontrar contraseñas, archivos, y otro tipo de debilidades en servicios web. 

## Principales Operadores

Hay como 44 tipos diferentes, a continuación los más populares y más usados bajo el contexto de la seguridad:


| Operador      | Descripción                                                   | Ejemplo                                   |
|---------------|---------------------------------------------------------------|-------------------------------------------|
|   "  "        | Encuentra el texto exacto dentro de las comillas              | "ciberseguridad"                          |
| AND / OR      | Muestra resultados que coincidan con alguna condición y/o varias  | ciberseguridad AND hacking                |
| intitle:      | Encuentra páginas que contienen un término específico en su título.      | intitle:"ciberseguridad"                 |
| inurl:        | Encuentra páginas con una URL que contiene un término específico.     | inurl:blog                                |
| filetype:     | Encuentra archivos de un tipo específico (por ejemplo, PDF, DOC, XLS). | filetype:pdf                              |
| ext:          | Encuentra archivos según la extensión                                            | ext:txt                                   |
| site:         | Restringe la búsqueda a un sitio web específico.                    | site:wikipedia.org                       |
| cache:        | Muestra la versión en caché de una URL específica.                     | cache:https://example.com                |
| link:         | Encuentra páginas que enlazan con la URL especificada.               | link:https://example.com                 |
| related:      | Muestra páginas web similares a la URL especificada.                 | related:https://example.com              |
| info:         | Proporciona información sobre una URL específica.                    | info:https://example.com                 |
| define:       | Muestra definiciones de términos específicos.                        | define:ciberseguridad                    |
| allintitle:   | Encuentra páginas que contienen todos los términos específicos en su título. | allintitle:ciberseguridad hacking        |
| allinurl:     | Encuentra páginas con una URL que contiene todos los términos específicos. | allinurl:cybersecurity news              |
| inanchor:     | Encuentra páginas con anclajes (textos de hipervínculo) que contienen términos específicos. | inanchor:"computer security"         |
| intext:       | Encuentra páginas que contienen un término específico en su contenido.   | intext:"security best practices"         |
| daterange:    | Devuelve resultados en un rango de tiempo específico      | daterange:2023-2024                       |
| size:         | Encuentra archivos de un tamaño específico en bytes.             | size:1000000                              |


Un ejemplo de dork para encontrar archivos sensibles:
```
inurl:"/etc/passwd"
```

Un dork que escandalizaría a cualquiera (literalmente encontré más documentos de empleados de dependencias de gobierno mexicanas.)

```
intext:'.pw' | '*.pass' | '*.passwd' | '*.password' | '*.pwpass' | '*.pwd' | '*.passphrase' | '*.secret' | '*.key' | '*.credential' | '*.token' | '*.msk' | '*.crypt' | '*.hash' | '*.db' | '*.dat' | '*.wallet'
```


## Otros usos 

Además de la ciberseguridad, los dorks son de ayuda en muchos otros ámbitos, como los siguientes:

- Investigación académica: Los dorks pueden utilizarse para buscar información específica en línea relacionada con la investigación académica, como artículos científicos, documentos técnicos, y otros recursos educativos. Considero este el más importante de todos, ya que la investifación es una precursora de resolución a necesidades humanas, tantas como sea posible imaginar

- Recopilación de datos: Nos pueden ser útiles para recopilar datos y estadísticas sobre temas específicos, como opiniones de usuarios sobre productos, tendencias de mercado, o información demográfica.

- Búsqueda de empleo: También pueden ser útiles para buscar oportunidades de empleo en línea, como listados de trabajos, perfiles de empresas, y recursos de desarrollo profesional, esto es otro uso muy importante.

- Búsqueda de medios de comunicación social: Los dorks pueden ser utilizados para buscar perfiles de medios de comunicación social, publicaciones relevantes, y conversaciones sobre temas específicos en plataformas como Twitter, Facebook, y LinkedIn.



### Fuentes de importancia a consultar:

-[Google Hacking Database](https://www.exploit-db.com/google-hacking-database)

-[Advanced Search Operators](https://ahrefs.com/blog/google-advanced-search-operators/)