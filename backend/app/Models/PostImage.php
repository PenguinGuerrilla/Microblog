<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PostImage extends Model
{
    protected $fillable = ['post_id', 'path'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn() => env('APP_URL').Storage::url($this->path),
        );
    }

    protected $appends = ['url'];

}
