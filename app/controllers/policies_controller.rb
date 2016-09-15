class PoliciesController < ApplicationController
  require 'json'

  def create
    policy = params.require(:policy)
    user_id = User.find_by(email: policy[:user_email]).id;
    document_id = policy[:document_id]
    permission = policy[:permission]

    @policy = Policy.create(user_id: user_id, document_id: document_id, permission: permission)

    if @policy.save
      render status: 201,
             json: {
               info: "Policy created",
               success: true,
               msg: "Arquivo compartilhado com sucesso :)"
             }
    else
      render status: 200,
             json: {
               info: "Policy not created",
               success: false,
               msg: "O arquvo não pôde ser compartilhado, por favor tente novamente. :("
             }
    end
  end

  def show
    policy = Policy.find(params[:id])

    respond_to do |format|
      format.json {
        render :json => policy.to_json
      }
    end
  end

  def find_document_policy
    policies = Policy.find_by(document_id: params[:document_id])

    respond_to do |format|
      format.json {
        render :json => policies.to_json
      }
    end
  end

  def update
  end

  def destroy
  end
end
