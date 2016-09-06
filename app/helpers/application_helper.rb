module ApplicationHelper
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
end
