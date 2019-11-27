<?php
/**
 * @copyright Copyright (c) 2017 Vinzenz Rosenkranz <vinzenz.rosenkranz@gmail.com>
 *
 * @author Vinzenz Rosenkranz <vinzenz.rosenkranz@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Polls\Db;

use OCP\AppFramework\Db\Mapper;
use OCP\IDBConnection;

class VoteMapper extends Mapper {

	/**
	 * VoteMapper constructor.
	 * @param IDBConnection $db
	 */
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'polls_votes', '\OCA\Polls\Db\Vote');
	}

	/**
	 * @param string $userId
	 * @param int $limit
	 * @param int $offset
	 * @return Vote[]
	 */
	public function findDistinctByUser($userId, $limit = null, $offset = null) {
		$sql = 'SELECT DISTINCT * FROM ' . $this->getTableName() . ' WHERE user_id = ?';
		return $this->findEntities($sql, [$userId], $limit, $offset);
	}

	/**
	 * @param int $pollId
	 * @param int $limit
	 * @param int $offset
	 * @return Vote[]
	 */
	public function findByPoll($pollId, $limit = null, $offset = null) {
		$sql = 'SELECT * FROM ' . $this->getTableName() . ' WHERE poll_id = ?';
		return $this->findEntities($sql, [$pollId], $limit, $offset);
	}

	/**
	 * @param int $pollId
	 * @param int $limit
	 * @param int $offset
	 * @return Vote[]
	 */
	public function findParticipantsByPoll($pollId, $limit = null, $offset = null) {
		$sql = 'SELECT DISTINCT user_id FROM ' . $this->getTableName() . ' WHERE poll_id = ?';
		return $this->findEntities($sql, [$pollId], $limit, $offset);
	}

	/**
	 * @param int $pollId
	 */
	public function deleteByPoll($pollId) {
		$sql = 'DELETE FROM ' . $this->getTableName() . ' WHERE poll_id = ?';
		$this->execute($sql, [$pollId]);
	}

	/**
	 * @param int $pollId
	 * @param string $userId
	 */
	public function deleteByPollAndUser($pollId, $userId) {
		$sql = 'DELETE FROM ' . $this->getTableName() . ' WHERE poll_id = ? AND user_id = ?';
		$this->execute($sql, [$pollId, $userId]);
	}
}
