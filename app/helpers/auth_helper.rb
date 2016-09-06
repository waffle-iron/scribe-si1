module AuthHelper
  def new_session(user)
    session[:current_user_id] = user.id
  end

  def destroy_session
    puts 'destroying session for ' + id
    session[:current_user_id] = nil
  end
end
