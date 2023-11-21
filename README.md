# PA-M295 Benutzerhandbuch


## 1. Datenbank erstellen

Zuerst soll man die Datenbank SkiServiceManagement auf dem ```localhost``` oder ```localhost/SQLEXPRESS``` Server erstellen, indem man die Datei ```query.sql``` in SQL Server Management Studio ausführt.


## 2. Web Api Starten

1. Navigieren Sie in den ordner WebApi und öffnenen Sie die ```M295PA.sln``` solution.
2. Um die Web Api erfolgreich starten zu können, muss man zuerst sicherstellen, ob der korrekte Connectionstring in der Datei ```appsettings.json``` vorhanden ist. Hier die jweiligen Connectionstrings je nach Server:
    
   - localhost: ```Server=.;Database=SkiServiceManagement;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true```
   - localhost\SQl-Express: ```Server=.\\SQLEXPRESS;Database=SkiServiceManagement;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true```
     
4. Jetzt kann die Web Api im ```http``` modus (ganz Wichtig!!) gestartet werden.

![image](https://github.com/iliakalygin/PA-M295/assets/58369822/f17bd223-e293-4a56-8560-d5fa05131a10)

## 3. Webseite starten

Um die website zu starten
