
// Trivial Multiedad — Vanilla JS (compatible con Safari moderno)
(function(){
  'use strict';

  // ====== Datos base ======
  const CATEGORIES = ["Ciencia y Naturaleza", "Historia", "Geografía", "Arte y Cultura", "Deportes y Ocio"];
  const AGE_BRACKETS = ["5","10","18"];

  // Distribución exacta: 100 preguntas por categoría (total 500).
  // Dentro de cada categoría: 33 (5 años), 33 (10 años), 34 (18+).
  const PER_CATEGORY_TOTAL = 100;
  const PER_AGE_COUNTS = { "5": 33, "10": 33, "18": 34 };

  // ====== Utilidades ======
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function pickN(arr, n) { return shuffle(arr.slice()).slice(0, n); }
  function choice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function uniqId(prefix="q"){ return prefix + Math.random().toString(36).slice(2,10); }

  function makeMCQ({text, correct, wrongs, category, age}){
    const options = shuffle([correct].concat(wrongs.slice(0,3)));
    return {
      id: uniqId(),
      category,
      age,
      q: text,
      options,
      answerIndex: options.indexOf(correct)
    };
  }

  // ====== Generadores por categoría/edad ======
  // Buscamos evitar datos conflictivos o polémicos con hechos muy básicos.

  // ---- Ciencia y Naturaleza ----
  function genScience(age){
    const qs = [];
    if(age === "5"){
      const animals = [
        {name:"león", habitat:"sabana", grupo:"mamífero", dieta:"carnívoro"},
        {name:"vaca", habitat:"pradera", grupo:"mamífero", dieta:"herbívoro"},
        {name:"tiburón", habitat:"océano", grupo:"pez", dieta:"carnívoro"},
        {name:"pingüino", habitat:"polar", grupo:"ave", dieta:"carnívoro"},
        {name:"rana", habitat:"humedal", grupo:"anfibio", dieta:"insectívoro"},
        {name:"águila", habitat:"montaña", grupo:"ave", dieta:"carnívoro"},
        {name:"elefante", habitat:"sabana", grupo:"mamífero", dieta:"herbívoro"},
        {name:"camello", habitat:"desierto", grupo:"mamífero", dieta:"herbívoro"},
        {name:"pulpo", habitat:"océano", grupo:"molusco", dieta:"carnívoro"},
        {name:"koala", habitat:"bosque", grupo:"mamífero", dieta:"herbívoro"},
        {name:"oso polar", habitat:"polar", grupo:"mamífero", dieta:"carnívoro"},
        {name:"delfín", habitat:"océano", grupo:"mamífero", dieta:"carnívoro"},
        {name:"zorro", habitat:"bosque", grupo:"mamífero", dieta:"omnívoro"},
        {name:"panda", habitat:"bosque", grupo:"mamífero", dieta:"herbívoro"},
        {name:"gato", habitat:"hogar", grupo:"mamífero", dieta:"carnívoro"},
        {name:"perro", habitat:"hogar", grupo:"mamífero", dieta:"omnívoro"},
        {name:"caballo", habitat:"pradera", grupo:"mamífero", dieta:"herbívoro"},
        {name:"pez payaso", habitat:"océano", grupo:"pez", dieta:"omnívoro"},
        {name:"tortuga", habitat:"playa", grupo:"reptil", dieta:"omnívoro"},
        {name:"loro", habitat:"selva", grupo:"ave", dieta:"herbívoro"}
      ];
      const habitats = ["selva","desierto","sabana","océano","pradera","bosque","polar","montaña","hogar","humedal","playa"];
      const grupos = ["mamífero","ave","pez","anfibio","reptil","insecto","molusco"];
      const dietas = ["herbívoro","carnívoro","omnívoro","insectívoro"];

      animals.forEach(a=>{
        qs.push(makeMCQ({
          text:`¿Dónde vive normalmente un ${a.name}?`,
          correct:a.habitat,
          wrongs: pickN(habitats.filter(h=>h!==a.habitat),3),
          category:"Ciencia y Naturaleza", age
        }));
        qs.push(makeMCQ({
          text:`¿A qué grupo pertenece el ${a.name}?`,
          correct:a.grupo,
          wrongs: pickN(grupos.filter(g=>g!==a.grupo),3),
          category:"Ciencia y Naturaleza", age
        }));
        qs.push(makeMCQ({
          text:`La dieta del ${a.name} es…`,
          correct:a.dieta,
          wrongs: pickN(dietas.filter(d=>d!==a.dieta),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      // Hechos básicos de cuerpo humano y naturaleza (Verdadero/Falso estilo MCQ)
      const vf = [
        ["El Sol es una estrella.", true],
        ["Las plantas necesitan agua y luz para crecer.", true],
        ["Los peces respiran bajo el agua.", true],
        ["La Luna brilla con luz propia.", false],
        ["Los árboles son animales.", false],
        ["Los pájaros tienen alas.", true],
        ["Los humanos tienen tres ojos.", false],
        ["La lluvia cae de las nubes.", true],
        ["El hielo es agua congelada.", true],
        ["Las jirafas son bajitas.", false]
      ];
      vf.forEach(([text,verdadero])=>{
        qs.push(makeMCQ({
          text,
          correct: verdadero ? "Verdadero" : "Falso",
          wrongs: verdadero ? ["Falso","No lo sé","Quizá"] : ["Verdadero","No lo sé","Quizá"],
          category:"Ciencia y Naturaleza", age
        }));
      });

      return qs;
    }

    if(age === "10"){
      // Planetas, estados de la materia, cadenas alimenticias, etc.
      const planetas = [
        ["Mercurio", "más cercano al Sol"],
        ["Venus", "muy caliente y con muchas nubes"],
        ["Tierra", "nuestro planeta"],
        ["Marte", "conocido como el planeta rojo"],
        ["Júpiter", "el planeta más grande"],
        ["Saturno", "tiene anillos visibles"],
        ["Urano", "gira de lado"],
        ["Neptuno", "el más lejano"]
      ];
      planetas.forEach(([p, dato])=>{
        qs.push(makeMCQ({
          text:`¿Qué afirmación describe a ${p}?`,
          correct:dato,
          wrongs: pickN(planetas.map(x=>x[1]).filter(x=>x!==dato),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      const estados = ["sólido","líquido","gas"];
      const materias = [
        ["hielo","sólido"],["agua","líquido"],["vapor","gas"],
        ["madera","sólido"],["aceite","líquido"],["aire","gas"],
        ["roca","sólido"],["zumo","líquido"],["helio","gas"]
      ];
      materias.forEach(([m, e])=>{
        qs.push(makeMCQ({
          text:`¿En qué estado está normalmente el/la ${m}?`,
          correct:e,
          wrongs: pickN(estados.filter(s=>s!==e),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      const sentidos = ["vista","oído","olfato","gusto","tacto"];
      const organo = {vista:"ojos",oído:"oído",olfato:"nariz",gusto:"lengua",tacto:"piel"};
      sentidos.forEach(s=>{
        qs.push(makeMCQ({
          text:`¿Con qué sentido percibimos los sabores?`,
          correct:"gusto",
          wrongs:["olfato","vista","tacto"],
          category:"Ciencia y Naturaleza", age
        }));
        qs.push(makeMCQ({
          text:`¿Qué órgano usamos para la ${s}?`,
          correct:organo[s],
          wrongs: pickN(Object.values(organo).filter(v=>v!==organo[s]),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      return qs;
    }

    if(age === "18"){
      // Símbolos químicos, sistema solar, biología básica
      const elementos = [
        ["Hidrógeno","H"],["Helio","He"],["Carbono","C"],["Nitrógeno","N"],["Oxígeno","O"],
        ["Sodio","Na"],["Magnesio","Mg"],["Aluminio","Al"],["Silicio","Si"],["Fósforo","P"],
        ["Azufre","S"],["Cloro","Cl"],["Potasio","K"],["Calcio","Ca"],["Hierro","Fe"],
        ["Cobre","Cu"],["Zinc","Zn"],["Plata","Ag"],["Estaño","Sn"],["Oro","Au"],
        ["Mercurio","Hg"],["Plomo","Pb"]
      ];
      elementos.forEach(([n,s])=>{
        qs.push(makeMCQ({
          text:`¿Cuál es el símbolo químico de ${n}?`,
          correct:s,
          wrongs: pickN(elementos.map(x=>x[1]).filter(x=>x!==s),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      const capas = [
        ["Mitocondria","produce energía celular"],
        ["Núcleo","contiene el material genético"],
        ["Ribosoma","sintetiza proteínas"],
        ["Cloroplasto","realiza la fotosíntesis (en plantas)"]
      ];
      capas.forEach(([org, func])=>{
        qs.push(makeMCQ({
          text:`¿Qué función cumple la ${org}?`,
          correct:func,
          wrongs: pickN(capas.map(x=>x[1]).filter(x=>x!==func),3),
          category:"Ciencia y Naturaleza", age
        }));
      });

      const f = [
        ["La Tierra tarda ~24 horas en rotar sobre su eje.","Verdadero"],
        ["El ADN es una proteína.","Falso"],
        ["Los virus no son células.","Verdadero"],
        ["El agua pura hierve a 100 °C al nivel del mar.","Verdadero"],
        ["Los mamíferos ponen huevos con frecuencia.","Falso"]
      ];
      f.forEach(([text,cor])=>{
        qs.push(makeMCQ({
          text,
          correct: cor,
          wrongs: cor==="Verdadero"?["Falso","No","Tal vez"]:["Verdadero","No","Tal vez"],
          category:"Ciencia y Naturaleza", age
        }));
      });

      return qs;
    }
    return qs;
  }

  // ---- Historia ----
  function genHistory(age){
    const qs = [];
    if(age==="5"){
      const vf = [
        ["Los dinosaurios vivieron antes que las personas.", "Verdadero"],
        ["Un castillo es más antiguo que un ordenador.", "Verdadero"],
        ["El futuro ya pasó.", "Falso"],
        ["La rueda se inventó antes que Internet.", "Verdadero"],
        ["Los faraones vivieron en Egipto.", "Verdadero"],
        ["Los cohetes existían en la prehistoria.", "Falso"],
        ["Las cuevas se usaban como casas antiguamente.", "Verdadero"],
        ["Cristóbal Colón viajó en barco.", "Verdadero"],
        ["Los romanos inventaron los teléfonos.", "Falso"],
        ["La imprenta es más antigua que los móviles.", "Verdadero"]
      ];
      vf.forEach(([text, cor])=>{
        qs.push(makeMCQ({
          text,
          correct:cor,
          wrongs: cor==="Verdadero"?["Falso","No lo sé","Quizá"]:["Verdadero","No lo sé","Quizá"],
          category:"Historia", age
        }));
      });
      // Oficios antiguos
      const oficios = [
        ["¿Quién construía cosas con piedra en la antigüedad?", "cantero", ["piloto","programador","astronauta"]],
        ["¿Qué usaban los mensajeros antes del email?", "cartas", ["drones","tablets","hologramas"]],
        ["Los vikingos viajaban en…", "barcos", ["aviones","coches","submarinos"]]
      ];
      oficios.forEach(([t,c,w])=>qs.push(makeMCQ({text:t,correct:c,wrongs:w,category:"Historia",age})));
      return qs;
    }
    if(age==="10"){
      // Comparaciones "¿Qué ocurrió antes?"
      const pares = [
        ["la imprenta de Gutenberg", "la Revolución Francesa"],
        ["el Imperio Romano", "Cristóbal Colón llega a América"],
        ["las pirámides de Egipto", "la Edad Media"],
        ["la invención del teléfono", "Internet"],
        ["la Primera Guerra Mundial", "la Segunda Guerra Mundial"],
        ["la caída del Imperio Romano de Occidente", "la Edad Media"],
        ["la máquina de vapor", "el motor de combustión"],
        ["el descubrimiento del fuego", "la rueda"]
      ];
      pares.forEach(([a,b])=>{
        qs.push(makeMCQ({
          text:`¿Qué ocurrió antes?`,
          correct:a,
          wrongs:[b,"Ocurrieron a la vez","Ninguna"],
          category:"Historia", age
        }));
        qs.push(makeMCQ({
          text:`¿Qué ocurrió después?`,
          correct:b,
          wrongs:[a,"A la vez","No ocurrió"],
          category:"Historia", age
        }));
      });

      const lugares = [
        ["Los faraones gobernaron en…","Egipto"],
        ["Los aztecas vivieron en…","Mesoamérica"],
        ["Los samuráis eran de…","Japón"],
        ["El Coliseo está en…","Roma"]
      ];
      const wrongPlaces = ["Grecia","China","India","Francia","Perú","México","Italia","Marruecos","España","Alemania","Reino Unido","Japón","Egipto","Roma","Atenas","Estambul"];
      lugares.forEach(([q, cor])=>{
        qs.push(makeMCQ({
          text:q,
          correct:cor,
          wrongs: pickN(wrongPlaces.filter(x=>x!==cor),3),
          category:"Historia", age
        }));
      });

      return qs;
    }
    if(age==="18"){
      // Parejas de invento/autor, países/épocas, hechos básicos
      const autores = [
        ["Teoría de la relatividad","Einstein"],
        ["El Quijote","Cervantes"],
        ["La Gioconda","Leonardo da Vinci"],
        ["La Ilíada","Homero"],
        ["El origen de las especies","Charles Darwin"],
        ["La Capilla Sixtina (frescos)","Miguel Ángel"]
      ];
      autores.forEach(([obra, autor])=>{
        qs.push(makeMCQ({
          text:`¿Quién está asociado a “${obra}”?`,
          correct:autor,
          wrongs: pickN(["Newton","Picasso","Shakespeare","Galileo","Bach","Beethoven","Platón","Goya","Gaudí","Marie Curie"].filter(x=>x!==autor),3),
          category:"Historia", age
        }));
      });

      const siglos = [
        ["Revolución Francesa","siglo XVIII"],
        ["Imprenta de Gutenberg","siglo XV"],
        ["Caída de Constantinopla","siglo XV"],
        ["Descubrimiento de América por Colón","siglo XV"],
        ["Primera Guerra Mundial","siglo XX"],
        ["Segunda Guerra Mundial","siglo XX"],
        ["Renacimiento","siglos XV–XVI"]
      ];
      siglos.forEach(([evento, siglo])=>{
        qs.push(makeMCQ({
          text:`¿En qué época/siglo se sitúa: ${evento}?`,
          correct:siglo,
          wrongs: pickN(["siglo XIV","siglo XVI","siglo XVII","siglo XIX","siglo XXI","Antigüedad"].filter(x=>x!==siglo),3),
          category:"Historia", age
        }));
      });

      const vf = [
        ["El Imperio Romano precede a la Edad Media en Europa.", "Verdadero"],
        ["La Revolución Industrial comenzó en el siglo XVIII.", "Verdadero"],
        ["La Guerra Fría fue un conflicto armado directo entre EE. UU. y la URSS.", "Falso"]
      ];
      vf.forEach(([t,c])=>{
        qs.push(makeMCQ({text:t,correct:c,wrongs:c==="Verdadero"?["Falso","No","Tal vez"]:["Verdadero","No","Tal vez"],category:"Historia",age}));
      });

      return qs;
    }
    return qs;
  }

  // ---- Geografía ----
  function genGeography(age){
    const qs=[];
    if(age==="5"){
      const vf = [
        ["El Polo Norte es un lugar muy frío.", "Verdadero"],
        ["El desierto tiene mucha agua.", "Falso"],
        ["La playa está junto al mar.", "Verdadero"],
        ["Las montañas son muy planas.", "Falso"],
        ["La selva tiene muchos árboles.", "Verdadero"]
      ];
      vf.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:c==="Verdadero"?["Falso","No","Tal vez"]:["Verdadero","No","Tal vez"],category:"Geografía",age})));
      const continentes = ["África","América","Asia","Europa","Oceanía","Antártida"];
      continentes.forEach(c=>{
        qs.push(makeMCQ({
          text:`${c} es un…`,
          correct:"continente",
          wrongs:["país","ciudad","río"],
          category:"Geografía", age
        }));
      });
      const agua = [
        ["¿Qué es el Nilo?","río"],
        ["¿Qué es el Atlántico?","océano"],
        ["¿Qué es el Mediterráneo?","mar"]
      ];
      const wrongs = ["lago","desierto","montaña"];
      agua.forEach(([t,cor])=>qs.push(makeMCQ({text:t,correct:cor,wrongs:pickN(wrongs,3),category:"Geografía",age})));
      return qs;
    }
    if(age==="10"){
      const paisesCapitales = [
        ["España","Madrid"],["Francia","París"],["Italia","Roma"],["Portugal","Lisboa"],["Alemania","Berlín"],
        ["Reino Unido","Londres"],["Irlanda","Dublín"],["Noruega","Oslo"],["Suecia","Estocolmo"],["Finlandia","Helsinki"],
        ["Dinamarca","Copenhague"],["Países Bajos","Ámsterdam"],["Bélgica","Bruselas"],["Suiza","Berna"],["Austria","Viena"],
        ["Grecia","Atenas"],["Polonia","Varsovia"],["Chequia","Praga"],["Hungría","Budapest"],["Rumanía","Bucarest"],
        ["Bulgaria","Sofía"],["Croacia","Zagreb"],["Serbia","Belgrado"],["Turquía","Ankara"],["Rusia","Moscú"]
      ];
      paisesCapitales.forEach(([p,c])=>{
        const wrong = pickN(paisesCapitales.map(x=>x[1]).filter(x=>x!==c),3);
        qs.push(makeMCQ({
          text:`¿Cuál es la capital de ${p}?`,
          correct:c, wrongs: wrong, category:"Geografía", age
        }));
      });

      const continentes = ["África","América","Asia","Europa","Oceanía","Antártida"];
      const ejemplos = [
        ["Egipto","África"],["Brasil","América"],["China","Asia"],["España","Europa"],["Australia","Oceanía"]
      ];
      ejemplos.forEach(([pais, cont])=>{
        qs.push(makeMCQ({
          text:`${pais} está en…`,
          correct:cont,
          wrongs: pickN(continentes.filter(x=>x!==cont),3),
          category:"Geografía", age
        }));
      });
      return qs;
    }
    if(age==="18"){
      const cap = [
        ["Estados Unidos","Washington D. C."],["Canadá","Ottawa"],["México","Ciudad de México"],["Argentina","Buenos Aires"],["Chile","Santiago"],
        ["Perú","Lima"],["Colombia","Bogotá"],["Venezuela","Caracas"],["Uruguay","Montevideo"],["Paraguay","Asunción"],
        ["Bolivia","La Paz"],["Ecuador","Quito"],["Japón","Tokio"],["China","Pekín"],["India","Nueva Delhi"],
        ["Corea del Sur","Seúl"],["Indonesia","Yakarta"],["Filipinas","Manila"],["Tailandia","Bangkok"],["Vietnam","Hanói"],
        ["Egipto","El Cairo"],["Marruecos","Rabat"],["Sudáfrica","Pretoria"],["Nigeria","Abuya"],["Kenia","Nairobi"],
        ["Australia","Canberra"],["Nueva Zelanda","Wellington"],["Arabia Saudí","Riad"],["Irán","Teherán"],["Irak","Bagdad"],
        ["Grecia","Atenas"],["Turquía","Ankara"],["Ucrania","Kiev"],["Bielorrusia","Minsk"],["Lituania","Vilna"],
        ["Letonia","Riga"],["Estonia","Tallin"],["Islandia","Reikiavik"],["Eslovenia","Liubliana"],["Eslovaquia","Bratislava"]
      ];
      cap.forEach(([p,c])=>{
        qs.push(makeMCQ({
          text:`Capital de ${p}`,
          correct:c,
          wrongs: pickN(cap.map(x=>x[1]).filter(x=>x!==c),3),
          category:"Geografía", age
        }));
      });
      const vf=[
        ["El Everest está en la cordillera del Himalaya.","Verdadero"],
        ["El Sáhara es un bosque tropical.","Falso"],
        ["El Amazonas es el río más caudaloso del mundo.","Verdadero"]
      ];
      vf.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:c==="Verdadero"?["Falso","No","Tal vez"]:["Verdadero","No","Tal vez"],category:"Geografía",age})));
      return qs;
    }
    return qs;
  }

  // ---- Arte y Cultura ----
  function genArts(age){
    const qs=[];
    if(age==="5"){
      const coloresPrimarios = ["rojo","azul","amarillo"];
      coloresPrimarios.forEach(col=>{
        qs.push(makeMCQ({
          text:`¿Cuál de estos es un color primario?`,
          correct:col,
          wrongs: pickN(["verde","negro","blanco","rosa","marrón"],3),
          category:"Arte y Cultura", age
        }));
      });
      const cuentos = [
        ["¿Quién llevaba capa roja?", "Caperucita Roja", ["Cenicienta","Blancanieves","Rapunzel"]],
        ["¿Quién vivía en una casa de chocolate?", "Hansel y Gretel", ["Pinocho","Pulgarcito","Bella"]],
        ["¿Quién tenía el pelo muy largo en una torre?", "Rapunzel", ["Caperucita","Ariel","Mulan"]]
      ];
      cuentos.forEach(([t,c,w])=>qs.push(makeMCQ({text:t,correct:c,wrongs:w,category:"Arte y Cultura",age})));
      const instrumentos=[
        ["¿Cuál de estos es un instrumento de cuerda?","guitarra",["trompeta","tambor","flauta"]],
        ["¿Cuál de estos es un instrumento de viento?","flauta",["violín","piano","batería"]]
      ];
      instrumentos.forEach(([t,c,w])=>qs.push(makeMCQ({text:t,correct:c,wrongs:w,category:"Arte y Cultura",age})));
      return qs;
    }
    if(age==="10"){
      const autores=[
        ["Harry Potter","J. K. Rowling"],
        ["El Principito","Antoine de Saint-Exupéry"],
        ["Alicia en el País de las Maravillas","Lewis Carroll"],
        ["Matilda","Roald Dahl"],
        ["Percy Jackson","Rick Riordan"]
      ];
      autores.forEach(([obra, autor])=>{
        qs.push(makeMCQ({
          text:`¿Quién escribió “${obra}”?`,
          correct:autor,
          wrongs: pickN(["C. S. Lewis","J. R. R. Tolkien","Michael Ende","Laura Gallego","Charles Perrault"].filter(x=>x!==autor),3),
          category:"Arte y Cultura", age
        }));
      });
      const pintura=[
        ["La Gioconda","Leonardo da Vinci"],
        ["Guernica","Pablo Picasso"],
        ["La noche estrellada","Vincent van Gogh"]
      ];
      pintura.forEach(([obra, autor])=>qs.push(makeMCQ({text:`¿Quién pintó “${obra}”?`,correct:autor,wrongs:pickN(["Rembrandt","Goya","Velázquez","Dalí","Monet"].filter(x=>x!==autor),3),category:"Arte y Cultura",age})));
      const cine=[
        ["El director de “E. T.” es…","Steven Spielberg"],
        ["“Toy Story” es de…","Pixar"]
      ];
      cine.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:pickN(["DreamWorks","Disney","Illumination","Paramount"].filter(x=>x!==c),3),category:"Arte y Cultura",age})));
      return qs;
    }
    if(age==="18"){
      const autores=[
        ["La Odisea","Homero"],
        ["Hamlet","William Shakespeare"],
        ["Cien años de soledad","Gabriel García Márquez"],
        ["Don Quijote de la Mancha","Miguel de Cervantes"],
        ["La metamorfosis","Franz Kafka"],
        ["Rayuela","Julio Cortázar"],
        ["Ulises","James Joyce"],
        ["La Divina Comedia","Dante Alighieri"]
      ];
      autores.forEach(([obra, autor])=>qs.push(makeMCQ({text:`Autor de “${obra}”`,correct:autor,wrongs:pickN(["Borges","Flaubert","Tolstói","Proust","Neruda","Saramago","Lope de Vega"].filter(x=>x!==autor),3),category:"Arte y Cultura",age})));
      const arte=[
        ["Las Meninas","Diego Velázquez"],
        ["La persistencia de la memoria","Salvador Dalí"],
        ["Impresión, sol naciente","Claude Monet"],
        ["El Grito","Edvard Munch"]
      ];
      arte.forEach(([obra, autor])=>qs.push(makeMCQ({text:`Autor de “${obra}”`,correct:autor,wrongs:pickN(["Manet","Picasso","Van Gogh","Renoir","Titian"].filter(x=>x!==autor),3),category:"Arte y Cultura",age})));
      const musica=[
        ["Autor de la 9ª sinfonía","Beethoven"],
        ["“La flauta mágica” es de…","Mozart"],
        ["“El Mesías” es de…","Händel"]
      ];
      musica.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:pickN(["Bach","Haydn","Vivaldi","Schubert"].filter(x=>x!==c),3),category:"Arte y Cultura",age})));
      return qs;
    }
    return qs;
  }

  // ---- Deportes y Ocio ----
  function genSports(age){
    const qs=[];
    if(age==="5"){
      const vf=[
        ["En fútbol se usa una pelota.","Verdadero"],
        ["En natación se nada en el agua.","Verdadero"],
        ["El ajedrez se juega corriendo.","Falso"],
        ["En baloncesto se encestan pelotas.","Verdadero"],
        ["En ciclismo se usan bicicletas.","Verdadero"]
      ];
      vf.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:c==='Verdadero'?['Falso','No','Tal vez']:['Verdadero','No','Tal vez'],category:'Deportes y Ocio',age})));
      const cuantos=[
        ["¿Cuántas ruedas tiene una bicicleta?", "2", ["3","4","1"]],
        ["¿Cuántos jugadores por equipo en baloncesto?", "5", ["7","9","11"]]
      ];
      cuantos.forEach(([t,c,w])=>qs.push(makeMCQ({text:t,correct:c,wrongs:w,category:"Deportes y Ocio",age})));
      const juegos=[
        ["¿Qué pieza es la más importante en ajedrez?","rey",["reina","alfil","torre"]]
      ];
      juegos.forEach(([t,c,w])=>qs.push(makeMCQ({text:t,correct:c,wrongs:w,category:"Deportes y Ocio",age})));
      return qs;
    }
    if(age==="10"){
      const equipos=[
        ["Fútbol: jugadores por equipo en el campo","11"],
        ["Balonmano: jugadores por equipo en el campo","7"],
        ["Voleibol: jugadores por equipo en pista","6"]
      ];
      equipos.forEach(([t,c])=>qs.push(makeMCQ({text:t,correct:c,wrongs:["5","9","10"],category:"Deportes y Ocio",age})));
      const olimpi=[
        ["¿Cada cuántos años se celebran los JJ. OO. de verano?","4",["2","3","5"]],
        ["¿Qué deporte usa red y raqueta?","tenis",["judo","gimnasia","baloncesto"]],
        ["¿Qué deporte incluye barras y anillas?","gimnasia artística",["fútbol","rugby","tenis"]]
      ];
      olimpi.forEach(([t,c,wr])=>qs.push(makeMCQ({text:t,correct:c,wrongs:wr,category:"Deportes y Ocio",age})));
      const ocio=[
        ["El juego en el que adivinas palabras dibujando se llama…","Pictionary",["Monopoly","Catan","Risk"]],
        ["El juego de construir con ladrillos de plástico es…","LEGO",["Play-Doh","K-NEX","Kapla"]]
      ];
      ocio.forEach(([t,c,wr])=>qs.push(makeMCQ({text:t,correct:c,wrongs:wr,category:"Deportes y Ocio",age})));
      return qs;
    }
    if(age==="18"){
      const deportes=[
        ["¿Cuántos puntos vale un triple en baloncesto?","3",["2","1","4"]],
        ["En tenis, 40–40 se llama…","deuce/iguales",["match point","set point","love"]],
        ["En rugby, un ensayo vale…","5",["3","2","4"]]
      ];
      deportes.forEach(([t,c,wr])=>qs.push(makeMCQ({text:t,correct:c,wrongs:wr,category:"Deportes y Ocio",age})));
      const ajedrez=[
        ["La única pieza que puede saltar otras piezas es…","el caballo",["la torre","la reina","el alfil"]],
        ["La notación para el enroque corto es…","O-O",["O-O-O","e4","fianchetto"]]
      ];
      ajedrez.forEach(([t,c,wr])=>qs.push(makeMCQ({text:t,correct:c,wrongs:wr,category:"Deportes y Ocio",age})));
      const ocio=[
        ["En Catan, los puntos para ganar normalmente son…","10",["7","12","15"]],
        ["Monopoly: ¿qué se compra?","propiedades",["cartas mágicas","vidas","poderes"]]
      ];
      ocio.forEach(([t,c,wr])=>qs.push(makeMCQ({text:t,correct:c,wrongs:wr,category:"Deportes y Ocio",age})));
      return qs;
    }
    return qs;
  }

  // Ensamblador de las 500 preguntas equilibradas
  function buildQuestionBank(){
    const byCatAge = {
      "Ciencia y Naturaleza": {},
      "Historia": {},
      "Geografía": {},
      "Arte y Cultura": {},
      "Deportes y Ocio": {}
    };

    // Generar candidatos amplios
    AGE_BRACKETS.forEach(age=>{
      byCatAge["Ciencia y Naturaleza"][age] = genScience(age);
      byCatAge["Historia"][age] = genHistory(age);
      byCatAge["Geografía"][age] = genGeography(age);
      byCatAge["Arte y Cultura"][age] = genArts(age);
      byCatAge["Deportes y Ocio"][age] = genSports(age);
    });

    // Seleccionar exactamente 33/33/34 por categoría
    const bank = [];
    Object.keys(byCatAge).forEach(cat=>{
      const ages = ["5","10","18"];
      ages.forEach(a=>{
        const need = PER_AGE_COUNTS[a];
        const pool = byCatAge[cat][a];
        // Si el pool es pequeño, lo mezclamos y reutilizamos variando las opciones (fallback)
        let selected = [];
        if(pool.length >= need){
          selected = pickN(pool, need);
        }else{
          const base = shuffle(pool.slice());
          while(selected.length < need){
            const ref = base[selected.length % base.length];
            // Clonar con opciones barajadas para evitar repetición literal
            const clone = {
              id: uniqId(),
              category: ref.category,
              age: ref.age,
              q: ref.q,
              options: shuffle(ref.options.slice()),
              answerIndex: -1
            };
            clone.answerIndex = clone.options.indexOf(ref.options[ref.answerIndex]);
            selected.push(clone);
          }
        }
        bank.push.apply(bank, selected);
      });
    });

    // Verificación simple
    // console.log("Total preguntas:", bank.length);
    return shuffle(bank);
  }

  // ====== Estado del juego ======
  const state = {
    players: [],
    turnIndex: 0,
    catIndex: 0,
    bank: [],
    usedIds: new Set(),
    winScore: null
  };

  // ====== UI refs ======
  const $ = sel=>document.querySelector(sel);
  const setupView = $("#setup");
  const gameView = $("#game");
  const playersUl = $("#players");
  const addBtn = $("#add-player");
  const nameInput = $("#player-name");
  const ageSelect = $("#player-age");
  const startBtn = $("#start-game");
  const demoBtn = $("#demo-fill");
  const winScoreInput = $("#win-score");
  const restartBtn = $("#restart");

  const turnPlayerEl = $("#turn-player");
  const turnAgeEl = $("#turn-age");
  const categoryPillEl = $("#category-pill");
  const scoreboardEl = $("#scoreboard");
  const questionTextEl = $("#question-text");
  const answersEl = $("#answers");
  const feedbackEl = $("#feedback");
  const nextBtn = $("#next");

  // ====== Setup ======
  function renderPlayers(){
    playersUl.innerHTML = "";
    state.players.forEach((p, idx)=>{
      const li = document.createElement("li");
      const name = document.createElement("div");
      name.className = "name";
      name.textContent = p.name;
      const age = document.createElement("div");
      age.className = "badge";
      age.textContent = p.age==="18" ? "18+" : p.age+" años";
      const rm = document.createElement("button");
      rm.className="ghost";
      rm.textContent="Quitar";
      rm.addEventListener("click", ()=>{
        state.players.splice(idx,1);
        renderPlayers();
      });
      li.appendChild(name);
      li.appendChild(age);
      li.appendChild(rm);
      playersUl.appendChild(li);
    });
    startBtn.disabled = state.players.length===0;
  }

  function addPlayer(name, age){
    name = (name||"").trim();
    if(!name) return;
    if(state.players.some(p=>p.name.toLowerCase()===name.toLowerCase())){
      alert("Ese nombre ya está en la lista.");
      return;
    }
    state.players.push({name, age, score: 0});
    renderPlayers();
  }

  addBtn.addEventListener("click", ()=>{
    addPlayer(nameInput.value, ageSelect.value);
    nameInput.value = "";
    nameInput.focus();
  });

  demoBtn.addEventListener("click", ()=>{
    if(state.players.length===0){
      addPlayer("Ana","5");
      addPlayer("Luis","10");
      addPlayer("Marta","18");
    }
  });

  startBtn.addEventListener("click", ()=>{
    state.bank = buildQuestionBank();
    state.usedIds = new Set();
    state.turnIndex = Math.floor(Math.random()*state.players.length);
    state.catIndex = 0;
    state.players = shuffle(state.players); // orden aleatorio
    const v = parseInt(winScoreInput.value,10);
    state.winScore = Number.isFinite(v) && v>0 ? v : null;

    // Cambiar de vista
    setupView.classList.remove("active");
    gameView.classList.add("active");

    renderScoreboard();
    nextQuestion();
  });

  restartBtn.addEventListener("click", ()=>{
    if(confirm("¿Reiniciar la partida? Se perderán los puntos.")){
      // volver al setup
      state.players = [];
      nameInput.value="";
      ageSelect.value="5";
      playersUl.innerHTML="";
      setupView.classList.add("active");
      gameView.classList.remove("active");
      feedbackEl.textContent="";
      answersEl.innerHTML="";
      questionTextEl.textContent="";
    }
  });

  // ====== Juego ======
  function renderScoreboard(){
    scoreboardEl.innerHTML = "";
    state.players.forEach((p, i)=>{
      const div = document.createElement("div");
      div.className = "item";
      const n = document.createElement("div");
      n.className = "name";
      n.textContent = p.name + (i===state.turnIndex ? " •" : "");
      const a = document.createElement("div");
      a.className = "age";
      a.textContent = p.age==="18" ? "18+" : p.age+" años";
      const pts = document.createElement("div");
      pts.className = "points";
      pts.textContent = p.score + " pts";
      div.appendChild(n); div.appendChild(a); div.appendChild(pts);
      scoreboardEl.appendChild(div);
    });
  }

  function takeQuestionFor(player, category){
    // Filtrar por edad y categoría y no repetida
    const pool = state.bank.filter(q=>q.age===player.age && q.category===category && !state.usedIds.has(q.id));
    if(pool.length===0){
      // si se agotó, intentar otra categoría (fallback)
      const altCats = CATEGORIES.filter(c=>c!==category);
      for(let c of altCats){
        const altPool = state.bank.filter(q=>q.age===player.age && q.category===c && !state.usedIds.has(q.id));
        if(altPool.length){ return choice(altPool); }
      }
      // si tampoco hay, tomar cualquiera de su edad
      const any = state.bank.filter(q=>q.age===player.age && !state.usedIds.has(q.id));
      if(any.length){ return choice(any); }
      // y si ya no quedan, cualquiera
      const rest = state.bank.filter(q=>!state.usedIds.has(q.id));
      if(rest.length){ return choice(rest); }
      return null;
    }
    return choice(pool);
  }

  function nextQuestion(){
    feedbackEl.textContent = "";
    answersEl.innerHTML = "";

    const player = state.players[state.turnIndex];
    const category = CATEGORIES[state.catIndex];

    turnPlayerEl.textContent = player.name;
    turnAgeEl.textContent = player.age==="18" ? "18+" : (player.age + " años");
    categoryPillEl.textContent = category;

    const q = takeQuestionFor(player, category);
    if(!q){
      questionTextEl.textContent = "No quedan más preguntas disponibles.";
      nextBtn.disabled = true;
      return;
    }
    state.usedIds.add(q.id);

    questionTextEl.textContent = q.q;
    q.options.forEach((opt, idx)=>{
      const btn = document.createElement("button");
      btn.type="button";
      btn.textContent = opt;
      btn.addEventListener("click", ()=>{
        Array.from(answersEl.children).forEach(b=>b.disabled=true);
        if(idx === q.answerIndex){
          btn.classList.add("correct");
          feedbackEl.textContent = "¡Correcto! +" + 1 + " punto";
          player.score += 1;
          checkWin(player);
        }else{
          btn.classList.add("wrong");
          const correctBtn = Array.from(answersEl.children)[q.answerIndex];
          if(correctBtn) correctBtn.classList.add("correct");
          feedbackEl.textContent = "Incorrecto";
        }
        renderScoreboard();
      });
      answersEl.appendChild(btn);
    });

    // Avanzar punteros para el próximo turno
    nextBtn.onclick = ()=>{
      state.turnIndex = (state.turnIndex + 1) % state.players.length;
      state.catIndex = (state.catIndex + 1) % CATEGORIES.length;
      nextQuestion();
    };
  }

  function checkWin(player){
    if(state.winScore && player.score >= state.winScore){
      setTimeout(()=>{
        alert(player.name + " ha ganado la partida 🎉");
      }, 50);
    }
  }

  // Accesibilidad: activar Enter en añadir
  nameInput.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){ e.preventDefault(); addBtn.click(); }
  });

  // Exponer algunas constantes para depurar
  window._TRIVIAL = {CATEGORIES, AGE_BRACKETS};
})();
