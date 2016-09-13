class PoliciesController < ApplicationController
  def create
    @policy = Policy.new

    if @policy.save(get_request_params)
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

  def update
  end

  def destroy
  end

  private
  def get_request_params
    params.require(:policy).permit(:document_id, :user_id, :permission)
  end
end
