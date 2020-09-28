Models :

3 Modèles :

User
Pilote
Travel


Le Travel est le modèle central, le user regarde les travels dispo (notion de disponible à définir)


User :
FirstName: string,
LastName: string,
email: string,
password: string,



Pilote :
FirstName: string,
LastName: string,
email: string,
password: string,
+ info mandatory


Travel :
description,
temps du traval,
price,
plane_name,
plane_description,
"place dans l'avion", ==> ???
id_pilote: [string], 
id_user: [String], 


+++++ Utilisation ++++++++
- Lorsque tu es un user tu te co et tu peux acceder à Mes vols et à l'inscription à un vol

- Lorsque tu es un pilote tu te co et tu peux accéder à Mes vols et à "Mes trajets"



+ Use case :

Utilisateur lambda :

Des que tu te connectes tu accèdes à ton profil,
