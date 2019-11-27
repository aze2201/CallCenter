<?php

/**
 * ownCloud - Music app
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Morris Jobke <hey@morrisjobke.de>
 * @author Pauli Järvinen <pauli.jarvinen@gmail.com>
 * @copyright Morris Jobke 2013
 * @copyright Pauli Järvinen 2016 - 2019
 */

namespace OCA\Music\BusinessLayer;

use \OCA\Music\AppFramework\BusinessLayer\BusinessLayer;
use \OCA\Music\AppFramework\Core\Logger;

use \OCA\Music\Db\TrackMapper;
use \OCA\Music\Db\Track;

use \OCA\Music\Utility\Util;

use \OCP\AppFramework\Db\DoesNotExistException;

class TrackBusinessLayer extends BusinessLayer {
	private $logger;

	public function __construct(TrackMapper $trackMapper, Logger $logger) {
		parent::__construct($trackMapper);
		$this->logger = $logger;
	}

	/**
	 * Returns all tracks filtered by artist
	 * @param string $artistId the id of the artist
	 * @param string $userId the name of the user
	 * @return array of tracks
	 */
	public function findAllByArtist($artistId, $userId) {
		return $this->mapper->findAllByArtist($artistId, $userId);
	}

	/**
	 * Returns all tracks filtered by album
	 * @param string $albumId the id of the track
	 * @param string $userId the name of the user
	 * @return \OCA\Music\Db\Track[] tracks
	 */
	public function findAllByAlbum($albumId, $userId, $artistId = null) {
		return $this->mapper->findAllByAlbum($albumId, $userId, $artistId);
	}

	/**
	 * Returns all tracks filtered by name (of track/album/artist)
	 * @param string $name the name of the track/album/artist
	 * @param string $userId the name of the user
	 * @return \OCA\Music\Db\Track[] tracks
	 */
	public function findAllByNameRecursive($name, $userId) {
		return $this->mapper->findAllByNameRecursive($name, $userId);
	}

	/**
	 * Returns the track for a file id
	 * @param string $fileId the file id of the track
	 * @param string $userId the name of the user
	 * @return \OCA\Music\Db\Track|null track
	 */
	public function findByFileId($fileId, $userId) {
		try {
			return $this->mapper->findByFileId($fileId, $userId);
		} catch (DoesNotExistException $e) {
			return null;
		}
	}

	/**
	 * Returns file IDs of all indexed tracks of the user
	 * @param string $userId
	 * @return int[]
	 */
	public function findAllFileIds($userId) {
		return $this->mapper->findAllFileIds($userId);
	}

	/**
	 * Returns all folders of the user containing indexed tracks, along with the contained track IDs
	 * @param string $userId
	 * @param Folder $userHome
	 * @return array of entries like {id: int, name: string, path: string, trackIds: int[]}
	 */
	public function findAllFolders($userId, $userHome) {
		// All tracks of the user, grouped by their parent folders. Some of the parent folders
		// may be owned by other users and are invisible to this user (in case of shared files).
		$tracksByFolder = $this->mapper->findTrackAndFolderIds($userId);

		// Get the folder names and paths for ordinary local folders directly from the DB.
		// This is significantly more efficient than using the Files API because we need to
		// run only single DB query instead of one per folder.
		$folderNamesAndPaths = $this->mapper->findNodeNamesAndPaths(
				\array_keys($tracksByFolder), $userHome->getStorage()->getId());

		// root folder has to be handled as a special case because shared files from
		// many folders may be shown to this user mapped under the root folder
		$rootFolderTracks = [];

		// Build the final results. Use the previously fetched data for the ordinary
		// local folders and query the data through the Files API for the more special cases.
		$result = [];
		foreach ($tracksByFolder as $folderId => $trackIds) {
			if (isset($folderNamesAndPaths[$folderId])) {
				// normal folder within the user home storage
				$entry = $folderNamesAndPaths[$folderId];
				// remove the "files" from the beginning of the folder path
				$entry['path'] = \substr($entry['path'], 5);
				// special handling for the root folder
				if ($entry['path'] === '') {
					$entry = null;
				}
			}
			else {
				// shared folder or parent folder of a shared file or an externally mounted folder
				$folderNode = $userHome->getById($folderId);
				if (\count($folderNode) === 0) {
					// other user's folder with files shared with this user (mapped under root)
					$entry = null;
				}
				else {
					$entry = [
						'name' => $folderNode[0]->getName(),
						'path' => $userHome->getRelativePath($folderNode[0]->getPath())
					];
				}
			}

			if ($entry) {
				$entry['trackIds'] = $trackIds;
				$entry['id'] = $folderId;
				$result[] = $entry;
			} else {
				$rootFolderTracks = \array_merge($rootFolderTracks, $trackIds);
			}
		}

		// add the root folder if it contains any tracks
		if (!empty($rootFolderTracks)) {
			$result[] = [
				'name' => '',
				'path' => '/',
				'trackIds' => $rootFolderTracks,
				'id' => $userHome->getId()
			];
		}

		return $result;
	}

	/**
	 * @param integer $artistId
	 * @return integer
	 */
	public function countByArtist($artistId) {
		return $this->mapper->countByArtist($artistId);
	}

	/**
	 * @param integer $albumId
	 * @return integer
	 */
	public function countByAlbum($albumId) {
		return $this->mapper->countByAlbum($albumId);
	}

	/**
	 * Adds a track if it does not exist already or updates an existing track
	 * @param string $title the title of the track
	 * @param string $number the number of the track
	 * @param string $year the year of the release
	 * @param string $artistId the artist id of the track
	 * @param string $albumId the album id of the track
	 * @param string $fileId the file id of the track
	 * @param string $mimetype the mimetype of the track
	 * @param string $userId the name of the user
	 * @param int $length track length in seconds
	 * @param int $bitrate track bitrate in bits (not kbits)
	 * @return \OCA\Music\Db\Track The added/updated track
	 */
	public function addOrUpdateTrack(
			$title, $number, $year, $artistId, $albumId, $fileId,
			$mimetype, $userId, $length=null, $bitrate=null) {
		$track = new Track();
		$track->setTitle($title);
		$track->setNumber($number);
		$track->setYear($year);
		$track->setArtistId($artistId);
		$track->setAlbumId($albumId);
		$track->setFileId($fileId);
		$track->setMimetype($mimetype);
		$track->setUserId($userId);
		$track->setLength($length);
		$track->setBitrate($bitrate);
		return $this->mapper->insertOrUpdate($track);
	}

	/**
	 * Deletes a track
	 * @param int[] $fileIds file IDs of the tracks to delete
	 * @param string[]|null $userIds the target users; if omitted, the tracks matching the
	 *                      $fileIds are deleted from all users
	 * @return False if no such track was found; otherwise array of six arrays
	 *         (named 'deletedTracks', 'remainingAlbums', 'remainingArtists', 'obsoleteAlbums',
	 *         'obsoleteArtists', and 'affectedUsers'). These contain the track, album, artist, and
	 *         user IDs of the deleted tracks. The 'obsolete' entities are such which no longer
	 *         have any tracks while 'remaining' entities have some left.
	 */
	public function deleteTracks($fileIds, $userIds = null) {
		$tracks = ($userIds !== null)
			? $this->mapper->findByFileIds($fileIds, $userIds)
			: $this->mapper->findAllByFileIds($fileIds);

		if (\count($tracks) === 0) {
			$result = false;
		} else {
			// delete all the matching tracks
			$trackIds = Util::extractIds($tracks);
			$this->deleteById($trackIds);

			// find all distinct albums, artists, and users of the deleted tracks
			$artists = [];
			$albums = [];
			$users = [];
			foreach ($tracks as $track) {
				$artists[$track->getArtistId()] = 1;
				$albums[$track->getAlbumId()] = 1;
				$users[$track->getUserId()] = 1;
			}
			$artists = \array_keys($artists);
			$albums = \array_keys($albums);
			$users = \array_keys($users);

			// categorize each artist as 'remaining' or 'obsolete'
			$remainingArtists = [];
			$obsoleteArtists = [];
			foreach ($artists as $artistId) {
				$result = $this->mapper->countByArtist($artistId);
				if ($result === '0') {
					$obsoleteArtists[] = $artistId;
				} else {
					$remainingArtists[] = $artistId;
				}
			}

			// categorize each album as 'remaining' or 'obsolete'
			$remainingAlbums = [];
			$obsoleteAlbums = [];
			foreach ($albums as $albumId) {
				$result = $this->mapper->countByAlbum($albumId);
				if ($result === '0') {
					$obsoleteAlbums[] = $albumId;
				} else {
					$remainingAlbums[] = $albumId;
				}
			}

			$result = [
				'deletedTracks'    => $trackIds,
				'remainingAlbums'  => $remainingAlbums,
				'remainingArtists' => $remainingArtists,
				'obsoleteAlbums'   => $obsoleteAlbums,
				'obsoleteArtists'  => $obsoleteArtists,
				'affectedUsers'    => $users
			];
		}

		return $result;
	}
}
