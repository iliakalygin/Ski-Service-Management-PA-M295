using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    // GET alles von api/Order
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
    {
        var orders = await _context.ServiceOrders.ToListAsync();

        if (orders == null || orders.Count == 0)
        {
            return NotFound();
        }
        return orders;
    }

    // POST nach api/Order
    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        order.CreateDate = DateTime.UtcNow;

        _context.ServiceOrders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllOrders), new { id = order.OrderID }, order);
    }


    // PUT nach api/Order/id
    [HttpPut("{id}")]
    public IActionResult PutServiceOrder(int id, Order serviceOrder)
    {
        if (id != serviceOrder.OrderID)
        {
            return BadRequest();
        }
        _context.Entry(serviceOrder).State = EntityState.Modified;
        try
        {
            _context.SaveChanges();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ServiceOrderExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    private bool ServiceOrderExists(int id)
    {
        return _context.ServiceOrders.Any(e => e.OrderID == id);
    }

    // DELETE aus api/Order/id
    [HttpDelete("{id}")]
    public IActionResult DeleteServiceOrder(int id)
    {
        var serviceOrder = _context.ServiceOrders.Find(id);
        if (serviceOrder == null)
        {
            return NotFound();
        }

        _context.ServiceOrders.Remove(serviceOrder);
        _context.SaveChanges();

        return NoContent();
    }
}
