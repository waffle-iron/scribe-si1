module ApplicationHelper
  include AuthHelper, DocumentsHelper, FoldersHelper, UsersHelper

  def is_logged_in?
    path = request.path
    if session[:current_user_id]
      redirect_to_drive if path != '/my-drive'
      return true
    else
      redirect_to_login if path != '/login' && path != '/'
      return false
    end
  end

  def redirect_to_drive
    redirect_to folders_path
  end

  def redirect_to_login
    redirect_to :controller => 'auth', :action => 'login'
  end

  def get_current_user
    @user ||= User.find(session[:current_user_id]) if session[:current_user_id]
  end

  def my_drive
    Folder.find_by(name: DEFAULT_FOLDER_NAME, user: get_current_user)
  end
end
