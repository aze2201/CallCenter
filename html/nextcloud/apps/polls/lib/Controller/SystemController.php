<?php
/**
 * @copyright Copyright (c) 2017 Vinzenz Rosenkranz <vinzenz.rosenkranz@gmail.com>
 *
 * @author René Gieling <github@dartcafe.de>
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

namespace OCA\Polls\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;

use OCP\IGroupManager;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IConfig;
use OCP\IRequest;

class SystemController extends Controller {

	private $systemConfig;

	/**
	 * PageController constructor.
	 * @param String $appName
	 * @param IConfig $systemConfig
	 * @param IRequest $request
	 * @param IGroupManager $groupManager
	 * @param IUserManager $userManager
	 */
	public function __construct(
		$appName,
		IGroupManager $groupManager,
		IUserManager $userManager,
		IConfig $systemConfig,
		IRequest $request
	) {
		parent::__construct($appName, $request);
		$this->systemConfig = $systemConfig;
		$this->groupManager = $groupManager;
		$this->userManager = $userManager;
	}

	/**
	 * Get the endor  name of the installation ('ownCloud' or 'Nextcloud')
	 * @NoAdminRequired
	 * @return String
	 */
	private function getVendor() {
		require \OC::$SERVERROOT . '/version.php';

		/** @var string $vendor */
		return (string) $vendor;
	}

	/**
	 * Get a list of NC users and groups
	 * @NoAdminRequired
	 * @return DataResponse
	 */
	public function getSiteUsersAndGroups($query = '', $getGroups = true, $getUsers = true, $skipGroups = array(), $skipUsers = array()) {
		$list = array();
		$data = array();
		if ($getGroups) {
			$groups = $this->groupManager->search($query);
			foreach ($groups as $group) {
				if (!in_array($group->getGID(), $skipGroups)) {
					$list[] = [
						'id' => $group->getGID(),
						'user' => $group->getGID(),
						'type' => 'group',
						'desc' => 'group',
						'icon' => 'icon-group',
						'displayName' => $group->getGID(),
						'avatarURL' => ''
					];
				}
			}
		}

		if ($getUsers) {
			$users = $this->userManager->searchDisplayName($query);
			foreach ($users as $user) {
				if (!in_array($user->getUID(), $skipUsers)) {
					$list[] = [
						'id' => $user->getUID(),
						'user' => $user->getUID(),
						'type' => 'user',
						'desc' => 'user',
						'icon' => 'icon-user',
						'displayName' => $user->getDisplayName(),
						'avatarURL' => '',
						'lastLogin' => $user->getLastLogin(),
						'cloudId' => $user->getCloudId()
					];
				}
			}
		}

		$data['siteusers'] = $list;
		return new DataResponse($data, Http::STATUS_OK);
	}

	/**
	 * Get some system informations
	 * @NoAdminRequired
	 * @return DataResponse
	 */
	public function getSystem() {
		$userId = \OC::$server->getUserSession()->getUser()->getUID();
		$data['system'] = [
			'versionArray' => \OCP\Util::getVersion(),
			'version' => implode('.', \OCP\Util::getVersion()),
			'vendor' => $this->getVendor(),
			'language' => $this->systemConfig->getUserValue($userId, 'core', 'lang')
		];

		return new DataResponse($data, Http::STATUS_OK);
	}
}
