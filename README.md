# Ski-Service-Management-PA-M295 Benutzerhandbuch

## Dokumentation

Eine genauere deokumentation des Projekts befindet sich hier: [Projektdokumentation.pdf](./Projektdokumentation.pdf)


## Verwendete NuGet Pakete

- Microsoft.AspNetCore.OpenApi v7.0.7
- Microsoft.EntityFrameworkCore v7.0.0
- Microsoft.EntityFrameworkCore.SqlServer v7.0.0
- Microsoft.EntityFrameworkCore.Tools v7.0.0
- Swashbuckle.AspNetCore v7.0.0

## Installation

### 1. Datenbank erstellen

Zuerst soll man die Datenbank SkiServiceManagement auf dem ```localhost``` oder ```localhost/SQLEXPRESS``` Server erstellen, indem man die Datei ```query.sql``` in SQL Server Management Studio ausführt.


### 2. Web Api Starten

1. Navigieren Sie in den Ordner WebApi und öffnenen Sie die ```M295PA.sln``` solution.
2. Um die Web Api erfolgreich starten zu können, muss man zuerst sicherstellen, ob der korrekte Connectionstring in der Datei ```appsettings.json``` vorhanden ist. Hier die jweiligen Connectionstrings je nach Server:
    
   - localhost (default): ```Server=.;Database=SkiServiceManagement;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true```
   - localhost\SQLEXPRESS: ```Server=.\\SQLEXPRESS;Database=SkiServiceManagement;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true```
     
4. Jetzt kann die Web Api im ```http``` modus (ganz Wichtig!!) gestartet werden.

![image](https://github.com/iliakalygin/PA-M295/assets/58369822/f17bd223-e293-4a56-8560-d5fa05131a10)

### 3. Webseite starten

Um die website zu starten öffnen Sie die ```index.html``` Datei die sich im Website Ordner befindet.
 
Sie gelangen nun auf die Homepage von Jetstream-Service. Gehen Sie auf die Anmelde Seite um sich für einen Service anzumelden.

 ![image](https://github.com/iliakalygin/PA-M295/assets/58369822/b8afca63-45ad-4db4-a544-fbd57f2e1406)


  Auf der Anmeldeseite angelangt geben Sie ihre Daten ein und wählen Sie Ihr gewünschtes Service.

![image](https://github.com/iliakalygin/PA-M295/assets/58369822/ea8f54c7-9255-45d4-a03b-5bae3cf7634d)


Nach einem erfolgreichen Anmelden für einen Service, gehen Sie auf Login und loggen sich mit Username: admin Password: admin ein. Hier sehen Sie alle Aufträge und können diese ebenfalls editieren und löschen.

 ![image](https://github.com/iliakalygin/PA-M295/assets/58369822/ecc7e8ee-93c0-4b28-af03-b3b6342980fd)


