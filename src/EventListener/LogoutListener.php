<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Event\LogoutEvent;

final class LogoutListener
{
    #[AsEventListener(event: LogoutEvent::class)]
    public function onLogoutEvent(LogoutEvent $event): void
    {
        $request = $event->getRequest();
        $response = $event->getResponse();

        if ($request->attributes->get('_route') === 'app_api_logout') {
            $response->setContent(json_encode([
                'message' => 'Successfully logged out',
            ]));
            $response->setStatusCode(Response::HTTP_OK);
            $response->headers->set('Content-Type', 'application/json');
        }
    }
}
