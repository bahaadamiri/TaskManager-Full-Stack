<?php

namespace App\Jobs;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendReminderJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $tasks = Task::where('status', 'Pending')
            ->where('updated_at', '<', now()->subHour())
            ->get();

        foreach ($tasks as $task) {
            \Log::info("Reminder: Task '{$task->title}' is still pending!");
        }
    }
}
