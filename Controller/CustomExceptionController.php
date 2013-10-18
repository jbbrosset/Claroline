<?php

namespace Claroline\CoreBundle\Controller;

use Symfony\Bundle\TwigBundle\Controller\ExceptionController;
use Symfony\Bundle\FrameworkBundle\Templating\TemplateReference;
use Symfony\Component\HttpFoundation\Request;

class CustomExceptionController extends ExceptionController
{
    /**
     * {@inheritdoc}
     */
    protected function findTemplate(Request $request, $format, $code, $debug)
    {
        $name = 'error';
        // when not in debug, try to find a template for the specific HTTP status code and format
        if (!$debug) {
            switch ($code) {
                case 404: $template = new TemplateReference('ClarolineCoreBundle', 'Exception', $name.$code, $format, 'twig');
                    break;
                case 403 : $template = new TemplateReference('ClarolineCoreBundle', 'Exception', $name.$code, $format, 'twig');
                    break;
                default: $template = new TemplateReference('ClarolineCoreBundle', 'Exception', $name.'500', $format, 'twig');
                    break;
            }
            
            if ($this->templateExists($template)) {
                return $template;
            }
        }
        return parent::findTemplate($request, $format, $code, $debug);
    }
}