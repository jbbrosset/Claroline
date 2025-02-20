<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\AgendaBundle\Security\Voter;

use Claroline\AgendaBundle\Entity\Task;

class TaskVoter extends AbstractEventVoter
{
    public function getClass()
    {
        return Task::class;
    }
}
