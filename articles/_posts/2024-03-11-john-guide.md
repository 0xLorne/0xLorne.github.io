---
layout: post
title: "Conociendo a: John The Ripper"
date: 2024-03-11
categories: [ciberseguridad,"password cracking",hash]
thumbnail: "assets/images/john/john.png"
---

# ¿Quién es John The Ripper?
John The Ripper o `john`, es una herramienta versátil y adaptable de cracking de hashes, en otras palabras, es una herramienta de ciberseguridad que podremos usar para descifrar contraseñas y otro tipo de contenido en un hash.

# ¿Qué es un hash?

Un hash o función hash es un algoritmo que transforma el contenido de una cadena de caracteres en una nueva con una longitud establecida, sin importar el tamaño de la entrada, sus aplicaciones van desde la *integridad de los datos* hasta la implementación en *protección de contraseñas*, en otras palabras, facilitan manipular información confidencial de manera segura, existen diferentes tipos de algoritmos, así como algoritmos establecidos como estándares para ciertos procesos, como `NTLM` para las contraseñas de **Windows** o `SHA512` para lo mismo en la mayoría de sistemas **Linux**. Si bien estos son muy importantes y populares, debemos entender que existen muchos tipos más que igualmente son aplicados en la vida cotidiana. Para investigar más sobre el tema, a continuación una [lista con la mayoría de tipos de hash](https://hashcat.net/wiki/doku.php?id=example_hashes.) Se recomienda investigar más a detalle sobre el tema, ya que es muy amplio y va más allá del alcance de este artículo.

Ejemplo de un hash con "Hola mundo!"

 - 6FAF6B0C72D56EAAA5EBE6722F37720F
 - 4c17251f721927663d722e6c02dee3882b0b92bee52da6aa7f02217cb3e5c1874a7d137960c0bb8eeb057d0987e44e78bcd49c15e8d904eb1485d37ec41b224c

#### ¿Qué es un diccionario?

Un archivo con una lista de cadenas que mayormente contiene contraseñas potenciales, normalmente incluyen contraseñas populares, o en ataques dirigidos, palabras y términos específicos correspondientes a las características del objetivo. 

#### ¿Qué es Fuerza bruta?

La fuerza bruta es un método de ataque que consiste en probar todas las posibles combinaciones de caracteres para descifrar contraseñas o vulnerar sistemas, popularmente se le conoce como el método más efectivo, ya que, mientras se tengan recursos y paciencia, se llegará al objetivo.

# Instalando y configurando John

Al ser una herramienta tan popular, está disponible para una gran cantidad de sistemas operativos y Distribuciones Linux, por lo que en este caso supondremos tener un sistema basado en [Debian](https://www.debian.org/) 

Instalación via apt:
```
sudo apt install john
```
Instalación via git:
```
git clone https://github.com/openwall/john -b bleeding-jumbo john
cd john/src/
./configure
make -s clean && make -sj4
```
El comando anterior especifica la rama **bleeding-jumbo**, que es más popular por sus características extra.
finalmente para probar el binario, podemos usar `./john --test`


# Identificando el tipo de hash

Para poder realizar un ataque sobre un hash, debemos saber de qué tipo es, esto se logra con herramientas como `hashid` que son realmente sencillas de utilizar, simplemente introducimos el hash en cuestión y nos debería devolver el tipo, justo así:

![hashid](/assets/images/john/hashid.png)

Es recomendable contar con varias herramientas de análisis de hash, para tener mayor certeza del tipo, ya que hay bastantes que son parecidos y crackear con un tipo de hash equivocado sólo resultará en una pérdida de tiempo.

# Primeros pasos con John

Afortunadamente la sintaxis de esta herramienta es muy sencilla y nos permitirá entender muy rápido qué es lo que hacemos, primero que nada, debemos pasar como mínimo 1 argumento, que es el archivo con el hash en cuestión que trataremos de romper, algo así:

```
john hash.txt
```

Si bien haciendo esto, podemos conseguir descifrar el hash, no es lo más recomendable, ya que hacemos que john descifre el tipo de hash (mediante técnicas basadas en la estructura y longitud del hash) y en la mayoría de los casos puede no hacerlo de manera eficiente, segundo, es una buena práctica especificar el diccionario que utilizaremos, en este caso, nuestro confiable amigo `rockyou.txt` para tener algo como lo siguiente:

```
john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```
En el comando anterior especificamos el tipo de hash con la flag `--format` y la ubicación de nuestro diccionario, con `--wordlist`

**Nota**: para conocer la sintaxis de cada tipo de hash en la flag --format, se recomienta usar el comando john --list=formats

# Single Crack

John nos permite realizar ciertos tipos más específicos de ataques, que nos permiten variar la sintaxis de nuestras posibles contraseñas, normalmente este modo se utiliza cuando podemos pensar que la complejidad de la contraseña es relativamente baja, es decir, no muy complicada, para ello se requiere que el hash tenga el formato `usuario:hash` y para este formato no necesitamos un diccionario, ya que este será generado por john

Un ejemplo, supongamos que tenemos un usuario llamado `lorne` y obtuvimos un hash, digamos `e79a07a6929602a2b91665bce524dc30`, ¿Qué sigue?

bien, debemos primero poner el hash y el usuario en el formato, de la siguiente manera:

- `lorne:e79a07a6929602a2b91665bce524dc30`

Una vez creado el formato y puesto en un archivo, nos queda indicarle a john qué tipo de ataque hará:

```
john --single --format=raw-md5 hash.txt
```

![John Single mode](/assets/images/john/single.png)

Para este tipo de ataque se utilizan las siguientes transformaciónes de "manglado":

1.**Mayúsculas y minúsculas**: Convertir todas las letras a mayúsculas o minúsculas, o alternarlas.

2.**Reemplazo de caracteres**: Cambiar ciertas letras por números o símbolos que se asemejen visualmente (por ejemplo, "a" por "@", "o" por "0", "l" por "1", etc.).

3.**Añadir prefijos o sufijos**: Agregar números, símbolos o palabras comunes antes o después de la palabra base.

4.**Permutaciones**: Reordenar las letras de la palabra base.

5.**Eliminación o duplicación de caracteres**: Eliminar o duplicar ciertos caracteres dentro de la palabra base.

# Reglas personalizadas

Ya sabemos como crackear hashes por medio de diccionarios genéricos y manglado simple, pero esto aún no es suficiente en la mayoría de los casos para obtener contraseñas que siguen un patrón o ciertos requisitos. Actualmente es más común que los servicios y organizaciones pidan que las contraseñas tengan una complejidad.

Las reglas de John funcionan de manera analógica a las **regex** o **expresiones regulares** por lo que un usuario que pueda crearlas y manipularlas, será capaz de realizar sus propios ataques con reglas personalizadas. 

#### Paso 1: Ubicar el archivo de configuración.
Las reglas personalizadas se encuentran en el archivo de configuración de john, en linux, sería: `/etc/john/john.conf`, por lo que debemos ir ahí. Es una buena práctica implementarlas en la sección de reglas, que se encuentra entre la línea **678** y **1173** (si nuestro archivo es la versión jumbo default)
#### Paso 2: Definir la regla personalizada.
Para que el programa entienda que estamos definiendo una regla, justo como una variable en cualquier lenguaje de programación, necesitamos indicarlo con la sintaxis adecuada, siendo la siguiente:
```
[List.Rules:MiReglaPersonalizada]
cAz"[.#\$!\-][1-9]"
```
donde `List.Rules` es el componente encargado de declarar que estamos usando una regla y `MiReglaPersonalizada` el nombre de la regla en cuestión.

la explicación de la regla es la siguiente:

- `c` $\rightarrow$ Capitaliza la palabra (le pone mayúscula a la primer letra)
- `Az` $\rightarrow$ Agrega a la final de la palabra lo que tenga a continuación
- `[.#\$!\-]` $\rightarrow$ añade alguno de los siguientes carácteres 
- `[1-9]` $\rightarrow$ añade alguno de los siguientes dígitos

#### Paso 3: Probar la regla.

En mi caso usando una palabra que supongamos se obtuvo de las posibles contraseñas, pero sigue las características anteriores.

`$2y$10$V/8KEx85Gw2eIIclKlT/beIonHOC4kDiBDBCJg58MIgkMKiJp4g.y` (Hash bcrypt) Tenemos este hash, y sabemos que la contraseña es una fruta, porque al objetivo en cuestión le encantan las frutas, así que creamos nuestro diccionario con frutas:

```
pera
uva
mango
manzana
fresa
piña
kiwi
sandia
platano
```

teniendo, nuestro hash, nuestras posibles contraseñas y nuestra regla personalizada, procedemos:

`john --format=bcrypt --rules=MiReglaPersonalizada --wordlist=frutas hash`


![Crackeada](/assets/images/john/cracked.png)

en resumen obtuvimos una contraseña con características personalizadas y palabras que podían ser la contraseña en cuestión usando reglas custom de john.

Recordando que john no se limita sólo a hashes, sino a archivos zip,rar,passphrase de llaves ssh, etcétera, los límites de uso ya no quedan en la implementación de la herramienta.

# ¿Cómo evitar ser atacado?

- Evitar contraseñas predecibles
- Usar frases largas como contraseña
- Implementar verificación de 2 factores (2FA)
- Cambiar las contraseñas si se tiene sospechas de haber sido hackeado o en proceso de
- No reciclar contraseñas
- Una alternativa viable también es utilizar gestores de contraseñas


# Conclusión

En conclusión, John The Ripper es una herramienta poderosa para descifrar hashes y desencriptar contraseñas. Proporciona varios métodos de ataque, incluyendo ataques de diccionario y ataques de fuerza bruta. Al entender los diferentes tipos de hashes y utilizar técnicas apropiadas, John The Ripper puede ser un activo valioso en el campo de la ciberseguridad. Sin embargo, es importante recordar que el uso de contraseñas fuertes y únicas, la implementación de métodos de autenticación avanzados y la actualización regular de contraseñas son prácticas esenciales para protegerse contra los ataques.



Para finalizar, compartiré algunos sitios que pueden interesar al lector si desea aprender más sobre esta herramienta.

# Fuentes de interés

- https://www.openwall.com/john/doc/RULES.shtml
- https://tryhackme.com/room/johntheripper0
