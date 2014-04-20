class PhotosController < ApplicationController
  before_filter :signed_in_user, only: [:update, :destroy]
  def index
    @photos = Photo.paginate(page: params[:page], per_page: 20)
  end

  def show
    @photo = Photo.find(params[:id])
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
    @photo.destroy
    flash[:success] = "Your photo was successfully deleted."
    redirect_to photos_path
  end
end
