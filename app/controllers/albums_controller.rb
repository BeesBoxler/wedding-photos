class AlbumsController < ApplicationController
  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
  end

  def new
    @album = Album.new
  end

  def create
    @album = Album.new(params[:album])
    if @album.save
      render 'index'
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
