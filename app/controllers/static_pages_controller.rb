class StaticPagesController < ApplicationController
  def error_404
  end

  def error_500
  end

  def landing
    @user = User.new(params[:user])
  end
end
