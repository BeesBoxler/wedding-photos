require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get error_404" do
    get :error_404
    assert_response :success
  end

  test "should get error_500" do
    get :error_500
    assert_response :success
  end

  test "should get landing" do
    get :landing
    assert_response :success
  end

end
