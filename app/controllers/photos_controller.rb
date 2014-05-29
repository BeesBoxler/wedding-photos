class PhotosController < ApplicationController
  before_filter :signed_in_user, only: [:create, :update, :destroy, :new, :edit]
  def index
    @photos = Photo.paginate(page: params[:photo_page], per_page: 20)
    @albums = Album.paginate(page: params[:album_page], per_page: 20)
    respond_to do |format|
      format.html
      format.json { render json: @photos }
    end
  end

  def show
    @photo = Photo.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @photo }
    end
  end

  def new
    @photo = Photo.new
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def create
    @user = current_user
    @photo = @user.photos.create(params[:photo])
 
  end

  def update
    @photo = Photo.find(params[:id])
  end

  def destroy
    @photo = Photo.find(params[:id])

    @albums = @photo.albums
    @albums.try(:each) do |a|
      a.save
    end

    @photo.destroy

    flash[:success] = "Your photo was successfully deleted."
    redirect_to photos_path
  end
end
