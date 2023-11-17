using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly Context _context;

    public EmployeeController(Context context)
    {
        _context = context;
    }

    // Methoden für die Handhabung von Mitarbeiterdaten
}