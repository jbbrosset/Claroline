<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\DropZoneBundle;

use Claroline\KernelBundle\Bundle\DistributionPluginBundle;
use Claroline\TeamBundle\ClarolineTeamBundle;

class ClarolineDropZoneBundle extends DistributionPluginBundle
{
    public function getRequiredPlugins()
    {
        return [
            ClarolineTeamBundle::class,
        ];
    }
}
