class NotificationsController < ApplicationController
  require 'json'

  def find_by_user
    notifications = Notification.where(to_user_id: params[:user_id])

    notifications.each do |notification|
      sender = User.find(notification.from_user_id)
      notification.sender_email = sender.email
    end

    respond_to do |format|
      format.json {
        render :json => notifications.to_json(:methods => [:sender_email])
      }
    end
  end

  def create
    @notification = Notification.new(get_request_params)

    if @notification.save
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
