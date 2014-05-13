class AlbumsController < ApplicationController
  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
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
      render 'new'
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
