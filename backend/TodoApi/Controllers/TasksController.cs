namespace TodoApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    // PATCH: api/tasks/{id}/toggle
    [HttpPatch("{id}/toggle")]
    public async Task<IActionResult> ToggleComplete(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        task.IsComplete = !task.IsComplete;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // PATCH: api/tasks/{id}/title
    [HttpPatch("{id}/title")]
    public async Task<IActionResult> UpdateTitle(int id, [FromBody] string title)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        task.Title = title;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/tasks/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}