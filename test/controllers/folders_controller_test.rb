require 'test_helper'

class FoldersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get folders_new_url
    assert_response :success
  end

  test "should get list" do
    get folders_list_url
    assert_response :success
  end

  test "should get show" do
    get folders_show_url
    assert_response :success
  end

  test "should get create" do
    get folders_create_url
    assert_response :success
  end

  test "should get edit" do
    get folders_edit_url
    assert_response :success
  end

  test "should get update" do
    get folders_update_url
    assert_response :success
  end

  test "should get delete" do
    get folders_delete_url
    assert_response :success
  end

end
