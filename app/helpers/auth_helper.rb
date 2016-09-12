module AuthHelper
  def new_session(user)
    puts 'Session created!'
    session[:current_user_id] = user.id
  end

  def destroy_session
    puts 'Destroying current session...'
    session[:current_user_id] = nil
    redirect_to :controller => 'auth', :action => 'login'
  end
end
