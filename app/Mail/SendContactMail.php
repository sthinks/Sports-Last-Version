<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendContactMail extends Mailable
{
    use Queueable, SerializesModels;
    public $details;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = $this->details;
        return $this->from('info@si.com.tr', 'İletişim Formu')->replyTo('socialthinks.admin@tepeservis.com.tr', 'SocialThinks')->subject('Sports International Yeni İletişim Formu')->view('mail.sendContactMail');
    }
}
