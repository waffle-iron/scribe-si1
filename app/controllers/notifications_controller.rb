class NotificationsController < ApplicationController
  require 'json'

  def user_notifications
    notifications = User.find(params[:current_user_id]).notifications
    respond_to do |format|
      format.json {
        render :json => notifications.to_json
      }
    end
  end

  def create
    @notification = Notification.new

    if @notification.save(get_request_params)
      render status: 201,
             json: {
               info: "Notification created",
               success: true,
               msg: "O usuário foi notificado! :)"
             }
    else
      render status: 200,
             json: {
               info: "Notification not created",
               success: false,
               msg: "Notificação não pôde ser enviada, por favor tente novamente. :("
             }
    end
  end

  def destroy
  end

  private
  def get_request_params
    params.require(:notification).permit(:from_user_id, :to_user_id, :message)
  end
end
