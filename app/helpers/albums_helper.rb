module AlbumsHelper

  def deletable?(album)
    if album.photos.size == 1
      return false
    else
      return true
    end
  end
end
