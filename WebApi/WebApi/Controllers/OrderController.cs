using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApi;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly Context _context;

    public OrderController(Context context)
    {
        _context = context;
    }

    // GET by ID: api/Order/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.ServiceOrders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }


    // POST: api/Order
    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        // Initialize default values if necessary
        order.CreateDate = DateTime.UtcNow; // Set the creation date to the current time
        order.Status = "Offen"; // You can set a default status or use the one provided in the request

        _context.ServiceOrders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.OrderID }, order);
    }


    // Weitere Methoden für PUT, DELETE usw.
}
