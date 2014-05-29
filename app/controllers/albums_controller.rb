class AlbumsController < ApplicationController
  before_filter :signed_in_user, only: [ :new, :create, :update, :remove_photo, :destroy ]
  before_filter :correct_user, only: [ :update, :remove_photo, :destroy ]
  def index
    @albums = Album.all
    respond_to do |format| 
      format.html { redirect_to photos_path }
      format.json { render json: { album: @albums }}
    end
  end

  def show
    @album = Album.find(params[:id])
    @photos = @album.photos
    respond_to do |format|
      format.html
      format.json { render json:  { album: @album,
                                    photos: @photos }}
    end
  end

  def new
    @album = Album.new
    @photos = Photo.all
  end

  def create
    @user = current_user
    @photos = Photo.all
    @album = @user.albums.create(params[:album])

    if @album.save
      redirect_to @album
    else
      @album.errors.full_messages.each do |e|
        flash[:error] = e
      end
      render action: 'new'
    end
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
    @album.save
    flash[:success] = "Your photo was successfully removed from this album."
    redirect_to @album
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy
  end
end
