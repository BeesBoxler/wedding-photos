class AlbumsController < ApplicationController
  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
    @photos = Photo.all
  end

  def new
    @album = Album.new
    @photos = Photo.all
  end

  def create
    @user = current_user
    @album = @user.albums.create(params[:album])
    if @album.save
      redirect_to @album
    else
      @album.errors.full_messages.each do |e|
        flash[:error] = e
      end
      redirect_to new_album_path
    end
  end

  def edit
  end

  def update
    @album = Album.find(params[:id])
    @album.update_attributes(params[:album])
    redirect_to @album
  end

  def remove_photo
    @album = Album.find(params[:id])
    @photo = Photo.find(params[:photo_id])
    @album.photos.destroy(@photo)

    redirect_to @album
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy
  end
end
